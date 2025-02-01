'use client'
import { createTransactionType, getTransactionType } from '@/api/transaction'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import React, { useEffect, useState } from 'react'

type Props = {}

const Page = (props: Props) => {
    const { isOpen: openDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const [data, setData] = useState([])

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
    const handleChange = (e: any) => {
        const { name, value } = e.target;
        // Update state untuk input lainnya
        setForm({ ...form, [name]: value });
    };

    const modalDeleteOpen = (item: any) => {
        console.log(item);
        onOpenDelete()
    }

    console.log(form);

    const handleCreate = async () => {
        await createTransactionType(form, (res: any) => {
            getTransactionType((res: any) => {
                setData(res.data)
            })
        })

        setForm({
            name: '',
            type1: '',
            type2: ''
        })
    }

    return (
        <DefaultLayout>
            <Card className='mb-5'>
                <h1 className='my-5 text-xl font-medium italic'>Buat Tipe Transaksi</h1>
                <InputForm className='border-2' type='text' value={form.name} htmlFor='name' placeholder='Masukan Nama Bank' onChange={handleChange} />
                <div className="flex gap-2">
                    <InputForm className='border-2' type='text' value={form.type1} htmlFor='type1' placeholder='Masukan Tipe 1' onChange={handleChange} />
                    <InputForm className='border-2' type='text' value={form.type2} htmlFor='type2' placeholder='Masukan Tipe 2' onChange={handleChange} />
                </div>
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
                                        <ButtonPrimary className='py-1 px-3 rounded-md' >Edit</ButtonPrimary>
                                        <ButtonSecondary className='py-1 px-3 rounded-md' onClick={() => modalDeleteOpen('wakwaw')} >Delete</ButtonSecondary>
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
                    <ButtonPrimary className='py-1 px-5 rounded-md font-medium'   >Ya</ButtonPrimary>
                    <ButtonSecondary className='py-1 px-5 rounded-md font-medium' onClick={onCloseDelete}>Tidak</ButtonSecondary>
                </div>
            </ModalAlert>
        </DefaultLayout>
    )
}

export default Page