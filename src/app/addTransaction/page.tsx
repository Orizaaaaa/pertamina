'use client'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { formatDate, formatDateStr } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { DatePicker } from '@nextui-org/react'
import React, { useState } from 'react'

type Props = {}

const Page = (props: Props) => {
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
    const dateNow = new Date();
    const [selectedDate, setSelectedDate] = useState(parseDate((formatDate(dateNow))))
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

    return (
        <DefaultLayout>
            <Card>
                <h1 className='italic text-xl font-medium mb-10'>Catat Transaksi</h1>
                <form action="">
                    <InputForm className='bg-slate-200' type='text' placeholder='Masukan Batch' onChange={handleChange} htmlFor='batch' value={form.batch} />
                    <div className="grid grid-cols-2 gap-5">
                        <InputForm className='bg-slate-200' type='text' placeholder='Masukan MID' onChange={handleChange} htmlFor='mid' value={form.mid} />
                        <InputForm className='bg-slate-200' type='text' placeholder='Masukan TID' onChange={handleChange} htmlFor='tid' value={form.tid} />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <InputForm className='bg-slate-200' type='text' placeholder='Masukan Amount' onChange={handleChange} htmlFor='amount' value={form.amount} />
                        <InputForm className='bg-slate-200' type='text' placeholder='Masukan Net Amount' onChange={handleChange} htmlFor='net_amount' value={form.net_amount} />
                    </div>
                    <DatePicker
                        size='sm'
                        onChange={handleDateChange}
                        value={selectedDate}
                        aria-label='datepicker' className="max-w-[284px] mb-2 bg-bone border-2 border-primary rounded-lg" />
                    <div className="grid grid-cols-2 gap-5">
                        <InputForm className='bg-slate-200' type='text' placeholder='Masukan Tipe Transaksi' onChange={handleChange} htmlFor='transaction_type' value={form.transaction_type} />
                        <InputForm className='bg-slate-200' type='text' placeholder='Masukan MDR' onChange={handleChange} htmlFor='mdr' value={form.mdr} />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <InputForm className='bg-slate-200' type='text' placeholder='Masukan Selisih' onChange={handleChange} htmlFor='difference' value={form.difference} />
                    </div>

                    <div className="flex justify-end">
                        <ButtonPrimary className='py-1 px-4 rounded-lg'>Simpan</ButtonPrimary>
                    </div>
                </form>

            </Card>
        </DefaultLayout>

    )
}

export default Page