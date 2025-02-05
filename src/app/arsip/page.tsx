'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { deleteTransaction, getTransaction, updateTransaction } from '@/api/transaction'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import ModalDefault from '@/components/fragemnts/modal/modal'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { dateFirst, formatDate, formatDateStr, formatDateTable } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { Autocomplete, AutocompleteItem, DatePicker, DateRangePicker, ModalContent, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

interface DropdownItem {
    label: string;
    value: string;
}

interface ItemData {
    id: string;
    name: string;
}


const Page = () => {
    const dateNow = new Date();
    const { data: dataDrop }: any = useSWR(`${url}/transactions-type/list`, fetcher, {
        keepPreviousData: true,
    });
    const [id, setId] = useState('')
    const [errorMsg, setErrorMsg] = useState(false)

    const [selectedDate, setSelectedDate] = useState(parseDate((formatDate(dateNow))))
    const [data, setData] = useState([])

    React.useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            date: formatDateStr(selectedDate),
        }));
    }, [selectedDate]);

    useEffect(() => {
        getTransaction((res: any) => {
            console.log(res);
            setData(res.data);

        });
    }, []);

    const [form, setForm] = useState({
        mid: "",
        tid: "",
        transaction_type: formatDateStr(selectedDate),
        batch: "",
        amount: 0,
        net_amount: 0,
        mdr: 0,
        status: "success",
        date: "",
        difference: 0
    });


    const { isOpen: openDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const modalDeleteOpen = (item: any) => {

        console.log(item);
        setId(item._id)
        onOpenDelete()
    }
    const modalUpdateOpen = (item: any) => {
        console.log(item);
        setErrorMsg(false)
        const date = new Date(item.date);
        setSelectedDate(parseDate(formatDate(date)));
        setId(item._id)
        setForm({
            ...form,
            mid: item.mid,
            tid: item.tid,
            transaction_type: item.transaction_type.id,
            batch: item.batch,
            amount: item.amount,
            net_amount: item.net_amount,
            mdr: item.mdr,
            status: "success",
            date: item.date,
            difference: item.difference
        })
        onOpen()
    }

    let [date, setDate] = React.useState({
        start: parseDate((formatDate(dateFirst))),
        end: parseDate((formatDate(dateNow))),
    });

    const startDate = formatDateStr(date.start);
    const endDate = formatDateStr(date.end);
    console.log(startDate, endDate);



    const handleDateChange = (date: any | null) => {
        setSelectedDate(date);
        setForm((prevForm) => ({
            ...prevForm,
            date: formatDateStr(date),
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Daftar field yang harus dikonversi ke number
        const numericFields = ['amount', 'net_amount', 'difference'];

        setForm(prevForm => ({
            ...prevForm,
            [name]: numericFields.includes(name) ? Number(value.replace(/\D/g, '')) || 0 : value
        }));
    };


    const dataDropdown: DropdownItem[] = (dataDrop?.data || []).map((item: ItemData) => ({
        label: item.name,
        value: item.id
    }));

    const handleDropdownSelection = (selectedValue: string, option: string) => {

        if (option === 'form') {
            setForm((prevForm) => ({
                ...prevForm,
                transaction_type: String(selectedValue),
            }))
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                transaction_type: String(selectedValue),
            }));
        }

    };


    const handleEdit = async () => {
        // Validasi jika ada field yang kosong
        if (!form.mid ||
            !form.tid ||
            !form.transaction_type ||
            !form.batch ||
            !form.date ||
            form.amount <= 0 ||
            form.net_amount <= 0 ||
            form.mdr < 0 ||
            form.difference < 0) {
            setErrorMsg(true);
            return; // Stop eksekusi jika ada data kosong
        }

        await updateTransaction(id, form, (response: any) => {
            console.log(response);
            getTransaction((res: any) => {
                setData(res.data);
            });
            onClose();
        });

        // Reset errorMsg jika berhasil
        setErrorMsg(false);
    };


    const handleDelete = async () => {
        await deleteTransaction(id, (res: any) => {
            console.log(res);
            getTransaction((res: any) => {
                console.log(res);
                setData(res.data);

            });
            onCloseDelete()
        })
    }
    console.log(selectedDate);
    console.log('form anjing', form);


    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium '>Arsip </h1>
                <p className='text-slate-500 text-small' >Semua pencatatan transaksi akan masuk dan di catat ke dalam arsip</p>
                <div className="total mt-4">
                    {/* <h1>Total Debit : Rp </h1>
                    <h1>Total Kredit: Rp </h1> */}
                </div>
                <div className="space-y-3 lg:space-y-0 lg:flex  justify-end gap-2 mt-3 lg:mt-0">
                    <ButtonSecondary className=' px-4 rounded-md'>Download dalam bentuk Excel</ButtonSecondary>
                    <DateRangePicker
                        visibleMonths={2}
                        size='sm' onChange={setDate} value={date} aria-label='datepicker' className="max-w-[284px] bg-bone border-2 border-primary rounded-lg"
                    />

                </div>

            </Card>

            <Table className="mt-10" aria-label="Example table without looping">
                <TableHeader>
                    <TableColumn>DATE</TableColumn>
                    <TableColumn>MID</TableColumn>
                    <TableColumn>TID</TableColumn>
                    <TableColumn>Tipe Transaksi</TableColumn>
                    <TableColumn>Batch</TableColumn>
                    <TableColumn>Amount</TableColumn>
                    <TableColumn>Net Amount</TableColumn>
                    <TableColumn>MDR</TableColumn>
                    <TableColumn>Selisih</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                    {(Array.isArray(data) ? data : []).map((item: any, index: number) => {


                        return (
                            <TableRow key={index || index || index || `empty-row-${index + 1}`}>
                                <TableCell>{formatDateTable(item.date || "")}</TableCell>
                                <TableCell>{item?.mid || ""}</TableCell>
                                <TableCell>{item?.tid || ""}</TableCell>
                                <TableCell>{item?.transaction_type?.name || ""}</TableCell>
                                <TableCell>{item?.batch || ""}</TableCell>
                                <TableCell>{item?.amount || ""}</TableCell>
                                <TableCell>{item?.net_amount || ""}</TableCell>
                                <TableCell>{item?.mdr || ""}</TableCell>
                                <TableCell>{item?.difference || ""}</TableCell>
                                {/* untuk table berada di bawah */}
                                {/* <TableCell>{item?.grossAmount || (index === data.length ? "Berhasil" : "")}</TableCell>
                                <TableCell>{item?.totalAmount || (index === data.length ? "Berhasil" : "")}</TableCell> */}
                                <TableCell>

                                    <div className="flex gap-3">
                                        <ButtonPrimary
                                            className="py-1 px-3 rounded-md"
                                            onClick={() => modalUpdateOpen(item)}
                                        >
                                            Edit
                                        </ButtonPrimary>
                                        <ButtonSecondary
                                            className="py-1 px-3 rounded-md"
                                            onClick={() => modalDeleteOpen(item)}
                                        >
                                            Delete
                                        </ButtonSecondary>
                                    </div>

                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>





            <ModalDefault isOpen={isOpen} onClose={onClose}>
                <h1 className='font-medium text-xl'>Edit Arsip</h1>
                <form action="">
                    <InputForm title='Batch' className='bg-slate-200' type='text' onChange={handleChange} htmlFor='batch' value={form.batch} />

                    <div className="grid grid-cols-2 gap-2">
                        <InputForm title='MID' className='bg-slate-200' type='text' onChange={handleChange} htmlFor='mid' value={form.mid} />
                        <InputForm title='TID' className='bg-slate-200' type='text' onChange={handleChange} htmlFor='tid' value={form.tid} />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <InputForm title='Amount' className='bg-slate-200' type='text' onChange={handleChange} htmlFor='amount' value={form.amount} />
                        <InputForm title='Net Amount' className='bg-slate-200' type='text' onChange={handleChange} htmlFor='net_amount' value={form.net_amount} />
                    </div>

                    <div className="grid grid-cols-2 gap-2 justify-between">
                        <div className="space-y-2">
                            <h1>Tanggal</h1>
                            <DatePicker
                                size='sm'
                                onChange={handleDateChange}
                                value={selectedDate}
                                aria-label='datepicker' className="w-full mb-2 bg-bone border-2
                         border-primary rounded-lg" />
                        </div>

                        <div className="space-y-2">
                            <h1>Tipe Transaksi</h1>
                            <Autocomplete
                                clearButtonProps={{ size: 'sm', onClick: () => setForm({ ...form, transaction_type: "" }) }}
                                onSelectionChange={(e: any) => handleDropdownSelection(e, 'form')}
                                defaultItems={dataDropdown}
                                defaultSelectedKey={form.transaction_type}
                                aria-label='dropdown'
                                className="max-w-xs border-2 border-primary rounded-lg "
                                size='sm'
                            >
                                {(item) => <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>}
                            </Autocomplete>

                        </div>


                    </div>



                    <div className="grid grid-cols-2 gap-2 justify-between">
                        <InputForm title='Selisih' className='bg-slate-200' type='text' onChange={handleChange} htmlFor='difference' value={form.difference} />
                        <InputForm title='Mdr' className='bg-slate-200 w-full' type='text' onChange={handleChange} htmlFor='mdr' value={form.mdr} />
                    </div>

                    <p className={`text-sm text-red ${errorMsg ? 'block' : 'hidden'}`}> *   Masukan semua form dengan benar</p>

                    <div className="flex justify-end">
                        <ButtonPrimary className='py-1 px-4 rounded-lg' onClick={handleEdit}>Simpan</ButtonPrimary>
                    </div>

                </form>
            </ModalDefault>

            <ModalAlert isOpen={openDelete} onClose={onCloseDelete} >
                <h1 className='text-lg' >Apakah anda yakin akan menghapus arsip ini ? </h1>
                <div className="flex justify-end gap-3">
                    <ButtonPrimary className='py-2 px-5 rounded-md font-medium' onClick={handleDelete}  >Ya</ButtonPrimary>
                    <ButtonSecondary className='py-2 px-5 rounded-md font-medium' onClick={onCloseDelete}>Tidak</ButtonSecondary>
                </div>
            </ModalAlert>



        </DefaultLayout>
    )
}

export default Page
