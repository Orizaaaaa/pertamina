'use client'
import { createTransactionType, deleteTransactionType, getTransactionType, updateTransactionType } from '@/api/transaction'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import ModalDefault from '@/components/fragemnts/modal/modal'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

type Props = {}

const Page = (props: Props) => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const { isOpen: openDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const [data, setData] = useState([])
    const [id, setId] = useState('')
    const [notif, setNotif] = useState('')
    const [notifEdit, setNotifEdit] = useState('')

    useEffect(() => {
        getTransactionType((res: any) => {
            setData(res.data)
        })
    }, []);

    const [form, setForm] = useState({
        name: '',
        type1: '',
        type2: ''
    })

    const [formEdit, setFormEdit] = useState({
        name: '',
        type1: '',
        type2: ''
    })


    const handleChange = (e: any) => {
        const { name, value } = e.target;
        // Update state untuk input lainnya
        setForm({ ...form, [name]: value });
    };

    const handleChangeEdit = (e: any) => {
        const { name, value } = e.target;
        setFormEdit((prev) => ({ ...prev, [name]: value }));
    };




    const modalDeleteOpen = (item: any) => {
        setId(item)
        onOpenDelete()
    }
    const modalEditOpen = (item: any) => {
        console.log(item);
        setId(item.id)
        // Ekstrak isi dalam tanda ()
        const match = item.name.match(/\(([^)]+)\)/);
        let type1 = '';
        let type2 = '';

        if (match) {
            const types = match[1].split(/\s*&\s*/); // Pisahkan berdasarkan " & "
            type1 = types[0] || '';
            type2 = types[1] || '';
        }

        onOpen();

        // Update hanya formEdit
        setFormEdit(prev => ({
            ...prev,
            name: item.bank,
            type1,
            type2
        }));
    };



    const handleEdit = async () => {
        setNotifEdit('')
        if (!formEdit.name
        ) {
            setNotifEdit('Masukan Nama Bank dengan benar')
            return; // Stop eksekusi jika ada data kosong
        }
        await updateTransactionType(id, formEdit, (response: any) => {
            console.log(response);
            getTransactionType((res: any) => {
                setData(res.data)
                setNotifEdit('')
            })

            onClose()
        })
    }


    const handleCreate = async () => {
        setNotif('')
        if (!form.name
        ) {
            setNotif('Masukan Nama Bank dengan benar')
            return; // Stop eksekusi jika ada data kosong
        }
        await createTransactionType(form, (response: any) => {
            console.log(response);
            getTransactionType((res: any) => {
                setData(res.data)
                setNotif('Tipe Transaksi berhasil ditambahkan')
            })
        })

        setForm({
            name: '',
            type1: '',
            type2: ''
        })
    }

    const handleDelete = async () => {
        await deleteTransactionType(id, (res: any) => {
            console.log(res);

            getTransactionType((res: any) => {
                setData(res.data)
            })
            onCloseDelete()
        })
    }

    console.log(formEdit);


    return (
        <DefaultLayout>
            <Card className='mb-5'>
                <h1 className='my-5 text-xl font-medium italic'>Buat Tipe Transaksi</h1>
                <InputForm className='border-2' type='text' value={form.name} htmlFor='name' placeholder='Masukan Nama Bank' onChange={handleChange} />
                <div className="flex gap-2">
                    <InputForm className='border-2' type='text' value={form.type1} htmlFor='type1' placeholder='Masukan Tipe 1' onChange={handleChange} />
                    <InputForm className='border-2' type='text' value={form.type2} htmlFor='type2' placeholder='Masukan Tipe 2' onChange={handleChange} />
                </div>
                <p className={`${notif === 'Masukan Nama Bank dengan benar' ? 'text-red' : 'text-green-700'} text-sm  `}>{notif}</p>
                <div className="flex justify-end">
                    <ButtonPrimary className='py-1 px-5 rounded-lg' onClick={handleCreate}>Simpan</ButtonPrimary>
                </div>
            </Card>
            <Card>
                <h1 className='my-5 text-xl font-medium italic'>Tipe Transaksi</h1>
                <Table removeWrapper aria-label="Example static collection table">
                    <TableHeader>
                        <TableColumn>ID</TableColumn>
                        <TableColumn>BANK</TableColumn>
                        <TableColumn>NAMA </TableColumn>
                        <TableColumn>ACTION</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {data?.map((item: any, index: number) => (
                            <TableRow key={`${index}`}>
                                <TableCell>{item?.id}</TableCell>
                                <TableCell>{item.bank}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>
                                    <div className="flex gap-3">
                                        <ButtonPrimary className='py-1 px-3 rounded-md' onClick={() => modalEditOpen(item)} >Edit</ButtonPrimary>
                                        <ButtonSecondary className='py-1 px-3 rounded-md' onClick={() => modalDeleteOpen(item.id)} >Delete</ButtonSecondary>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>
            </Card>

            <ModalAlert isOpen={openDelete} onClose={onCloseDelete} >
                <h1 className='text-lg' >Apakah anda yakin akan menghapus tipe transaksi ini ? </h1>
                <div className="flex justify-end gap-3">
                    <ButtonPrimary className='py-1 px-5 rounded-md font-medium' onClick={handleDelete}  >Ya</ButtonPrimary>
                    <ButtonSecondary className='py-1 px-5 rounded-md font-medium' onClick={onCloseDelete}>Tidak</ButtonSecondary>
                </div>
            </ModalAlert>

            <ModalDefault isOpen={isOpen} onClose={onClose} >
                <form action="">
                    <h1 className='my-5 text-xl font-medium italic'>Edit Tipe Transaksi</h1>
                    <InputForm className='border-2' type='text' value={formEdit.name} htmlFor='name' placeholder='Masukan Nama Bank' onChange={handleChangeEdit} />
                    <div className="flex gap-2">
                        <InputForm className='border-2' type='text' value={formEdit.type1} htmlFor='type1' placeholder='Masukan Tipe 1' onChange={handleChangeEdit} />
                        <InputForm className='border-2' type='text' value={formEdit.type2} htmlFor='type2' placeholder='Masukan Tipe 2' onChange={handleChangeEdit} />
                    </div>
                    <p className={`${notifEdit === 'Masukan Nama Bank dengan benar' ? 'text-red' : 'text-green-700'} text-sm  `}>{notifEdit}</p>
                    <div className="flex justify-end">
                        <ButtonPrimary className='py-1 px-5 rounded-lg' onClick={handleEdit}>Simpan</ButtonPrimary>
                    </div>
                </form>
            </ModalDefault>
        </DefaultLayout>
    )
}

export default Page