'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { getTransaction } from '@/api/transaction'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import ModalDefault from '@/components/fragemnts/modal/modal'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { dateFirst, formatDate, formatDateStr } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { Autocomplete, AutocompleteItem, DatePicker, DateRangePicker, ModalContent, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
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


    const [selectedDate, setSelectedDate] = useState(parseDate((formatDate(dateNow))))
    const [data, setData] = useState([])
    useEffect(() => {
        getTransaction((res: any) => {
            console.log(res);

            setData(res.data)
        })
    }, []);

    const { isOpen: openDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const { isOpen, onOpen, onClose } = useDisclosure();
    const modalDeleteOpen = (item: any) => {
        console.log(item);
        onOpenDelete()
    }
    const modalUpdateOpen = (item: any) => {
        console.log(item);
        onOpen()
    }


    let [date, setDate] = React.useState({
        start: parseDate((formatDate(dateFirst))),
        end: parseDate((formatDate(dateNow))),
    });

    const startDate = formatDateStr(date.start);
    const endDate = formatDateStr(date.end);
    console.log(startDate, endDate);

    const [form, setForm] = useState({
        mid: "",
        tid: "",
        transaction_type: "",
        batch: "",
        amount: "",
        net_amount: "",
        mdr: "",
        status: "success",
        date: "",
        difference: ""
    });

    const handleDateChange = (date: any | null) => {
        setSelectedDate(date);
        setForm((prevForm) => ({
            ...prevForm,
            date: formatDateStr(date),
        }));
    };

    const handleChange = (e: any) => {
        const { name, value } = e.target;

        if (name === 'amount') {
            let numericValue = value.replace(/\D/g, '');
            setForm({ ...form, [name]: numericValue });
            return;
        } else if (name === 'net_amount') {
            let numericValue = value.replace(/\D/g, '');
            setForm({ ...form, [name]: numericValue });
            return;
        } else if (name === 'difference') {
            let numericValue = value.replace(/\D/g, '');
            setForm({ ...form, [name]: numericValue });
            return;
        }


        setForm({ ...form, [name]: value });
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

    console.log(dataDrop);
    console.log('anjing', data);



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

            <Table className=" mt-10 " aria-label="Example table without looping">
                <TableHeader>
                    <TableColumn>MID</TableColumn>
                    <TableColumn>TID</TableColumn>
                    <TableColumn>Tipe Transaksi</TableColumn>
                    <TableColumn>Batch</TableColumn>
                    <TableColumn>Amount</TableColumn>
                    <TableColumn>Gross Amount</TableColumn>
                    <TableColumn>Total Amount</TableColumn>
                    <TableColumn>Total Gross Amount</TableColumn>
                    <TableColumn>Action</TableColumn>
                </TableHeader>
                <TableBody>
                    <TableRow key="1">
                        <TableCell>0089866654433</TableCell>
                        <TableCell>OA78BN99</TableCell>
                        <TableCell>BNI</TableCell>
                        <TableCell>2199</TableCell>
                        <TableCell>10000</TableCell>
                        <TableCell>20000</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>
                            <div className="flex gap-3">
                                <ButtonPrimary className='py-1 px-3 rounded-md' onClick={() => modalUpdateOpen('wakwaw')}>Edit</ButtonPrimary>
                                <ButtonSecondary className='py-1 px-3 rounded-md' onClick={() => modalDeleteOpen('wakwaw')}>Delete</ButtonSecondary>
                            </div>
                        </TableCell>

                    </TableRow>
                    <TableRow key="2">
                        <TableCell>0089866654433</TableCell>
                        <TableCell>OA78BN99</TableCell>
                        <TableCell className='text-small'>BNI</TableCell>
                        <TableCell>2199</TableCell>
                        <TableCell>10000</TableCell>
                        <TableCell>20000</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>
                            <div className="flex gap-3">
                                <ButtonPrimary className='py-1 px-3 rounded-md' onClick={() => modalUpdateOpen('wakwaw')}>Edit</ButtonPrimary>
                                <ButtonSecondary className='py-1 px-3 rounded-md' onClick={() => modalDeleteOpen('wakwaw')}>Delete</ButtonSecondary>
                            </div>
                        </TableCell>
                    </TableRow>
                    <TableRow key="3">
                        <TableCell>{''}</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>{''}</TableCell>
                        <TableCell>40.000</TableCell>
                        <TableCell>40.000</TableCell>
                        <TableCell>
                            {''}
                        </TableCell>
                    </TableRow>

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

                    <div className="flex justify-end">
                        <ButtonPrimary className='py-1 px-4 rounded-lg'>Simpan</ButtonPrimary>
                    </div>
                </form>
            </ModalDefault>

            <ModalAlert isOpen={openDelete} onClose={onCloseDelete} >
                <h1 className='text-lg' >Apakah anda yakin akan menghapus arsip ini ? </h1>
                <div className="flex justify-end gap-3">
                    <ButtonPrimary className='py-2 px-5 rounded-md font-medium'   >Ya</ButtonPrimary>
                    <ButtonSecondary className='py-2 px-5 rounded-md font-medium' onClick={onCloseDelete}>Tidak</ButtonSecondary>
                </div>
            </ModalAlert>



        </DefaultLayout>
    )
}

export default Page
