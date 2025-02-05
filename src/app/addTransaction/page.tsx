'use client'
import { url } from '@/api/auth'
import { fetcher } from '@/api/fetcher'
import { createTransaction, getTransactionType } from '@/api/transaction'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { formatDate, formatDateStr } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { Autocomplete, AutocompleteItem, DatePicker } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import useSWR from 'swr'

type Props = {}

interface DropdownItem {
    label: string;
    value: string;
}

interface ItemData {
    id: string;
    name: string;
}

const Page = (props: Props) => {
    const router = useRouter()
    const [form, setForm] = useState({
        mid: "",
        tid: "",
        transaction_type: "",
        batch: "",
        amount: 0,
        net_amount: 0,
        mdr: 0,
        status: "success",
        date: "",
        difference: 0
    });
    const dateNow = new Date();
    const [selectedDate, setSelectedDate] = useState(parseDate((formatDate(dateNow))))
    const [errorMsg, setErrorMsg] = useState(false)
    const { data } = useSWR(`${url}/transactions-type/list`, fetcher, {
        keepPreviousData: true,
    });


    React.useEffect(() => {
        setForm((prevForm) => ({
            ...prevForm,
            date: formatDateStr(selectedDate),
        }));
    }, [selectedDate]);


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
        const numericFields = ['amount', 'net_amount', 'difference', 'mdr'];

        setForm(prevForm => ({
            ...prevForm,
            [name]: numericFields.includes(name) ? Number(value.replace(/\D/g, '')) || 0 : value
        }));
    };


    const dataDropdown: DropdownItem[] = (data?.data || []).map((item: ItemData) => ({
        label: item.name,
        value: item.id
    }));

    const handleDropdownSelection = (selectedValue: string, option: string) => {
        console.log('haii', selectedValue);

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

    console.log(data);
    console.log(form);

    const handleCreate = async () => {
        setErrorMsg(false);

        console.log("Form Data Sebelum Validasi:", form); // Debugging

        // Validasi jika ada field yang kosong atau tidak valid
        if (
            !form.mid ||
            !form.tid ||
            !form.transaction_type ||
            !form.batch ||
            !form.date ||
            form.amount <= 0 ||
            form.net_amount <= 0 ||
            form.mdr < 0 ||
            form.difference < 0
        ) {
            console.log("Validasi Gagal: Ada data yang kosong atau tidak valid");
            setErrorMsg(true);
            return; // Stop eksekusi jika ada data kosong
        }

        console.log("Form Data Setelah Validasi:", form); // Debugging

        try {
            await createTransaction(form, (response: any) => {
                console.log("Response dari API:", response);
                router.push('/arsip');
            });

            // Reset form setelah berhasil
            setForm({
                mid: "",
                tid: "",
                transaction_type: "",
                batch: "",
                amount: 0,
                net_amount: 0,
                mdr: 0,
                status: "success",
                date: "",
                difference: 0
            });

            // Reset errorMsg jika berhasil
            setErrorMsg(false);
        } catch (error) {
            console.error("Gagal mengirim data:", error);
            setErrorMsg(true);
        }
    };



    return (
        <DefaultLayout>
            <Card>
                <h1 className='italic text-xl font-medium mb-10'>Catat Transaksi</h1>
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



                    <div className="grid grid-cols-2 gap-2 justify-between mt-2">
                        <InputForm title='Selisih' className='bg-slate-200' type='text' onChange={handleChange} htmlFor='difference' value={form.difference} />
                        <InputForm title='Mdr' className='bg-slate-200 w-full' type='text' onChange={handleChange} htmlFor='mdr' value={form.mdr} />
                    </div>
                    <p className={`text-sm text-red ${errorMsg ? 'block' : 'hidden'}`}> *   Masukan semua form dengan benar</p>
                    <div className="flex justify-end">
                        <ButtonPrimary className='py-1 px-4 rounded-lg' onClick={handleCreate}>Simpan</ButtonPrimary>
                    </div>

                </form>

            </Card>
        </DefaultLayout>

    )
}

export default Page