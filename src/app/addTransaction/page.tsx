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
        amount: 0,
        net_amount: 0,
        mdr: 0,
        status: "success",
        date: "",
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
        // Update state untuk input lainnya
        setForm({ ...form, [name]: value });
    };

    return (
        <DefaultLayout>
            <Card>
                <h1 className='italic text-xl font-medium mb-10'>Catat Transaksi</h1>
                <form action="">
                    <InputForm className='bg-slate-200' type='text' placeholder='Masukan Batch' onChange={handleChange} htmlFor='mid' value={form.mid} />
                    <div className="grid grid-cols-2 gap-5">
                        <InputForm className='bg-slate-200' type='text' placeholder='Masukan MID' onChange={handleChange} htmlFor='mid' value={form.mid} />
                        <InputForm className='bg-slate-200' type='text' placeholder='Masukan TID' onChange={handleChange} htmlFor='mid' value={form.mid} />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <InputForm className='bg-slate-200' type='text' placeholder='Masukan Amount' onChange={handleChange} htmlFor='mid' value={form.mid} />
                        <InputForm className='bg-slate-200' type='text' placeholder='Masukan Net Amount' onChange={handleChange} htmlFor='mid' value={form.mid} />
                    </div>
                    <DatePicker
                        size='sm'
                        onChange={handleDateChange}
                        value={selectedDate}
                        aria-label='datepicker' className="max-w-[284px] mb-2 bg-bone border-2 border-primary rounded-lg" />
                    <div className="grid grid-cols-2 gap-5">
                        <InputForm className='bg-slate-200' type='text' placeholder='Masukan Tipe Transaksi' onChange={handleChange} htmlFor='mid' value={form.mid} />
                        <InputForm className='bg-slate-200' type='text' placeholder='Masukan MDR' onChange={handleChange} htmlFor='mid' value={form.mid} />
                    </div>
                    <div className="grid grid-cols-2 gap-5">
                        <InputForm className='bg-slate-200' type='text' placeholder='Masukan Selisih' onChange={handleChange} htmlFor='mid' value={form.mid} />
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