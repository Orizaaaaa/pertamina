'use client'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import Card from '@/components/elements/card/Card'
import InputForm from '@/components/elements/input/InputForm'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { formatDate, formatDateStr } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { Autocomplete, AutocompleteItem, DatePicker } from '@nextui-org/react'
import React, { useState } from 'react'

type Props = {}

const Page = (props: Props) => {
    const [form, setForm] = useState({
        mid: "",
        tid: "",
        transaction_type: 0,
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


    const dataDropdown = [
        { label: "Aset", value: 1, },
        { label: "Kewajiban", value: 2, },
        { label: "Ekuitas", value: 3 },
        { label: "Pendapatan", value: 4 },
        { label: "Beban", value: 5 },
    ];

    const handleDropdownSelection = (selectedValue: number, option: string) => {
        console.log('haii', selectedValue);

        if (option === 'form') {
            setForm((prevForm) => ({
                ...prevForm,
                transaction_type: Number(selectedValue),
            }))
        } else {
            setForm((prevForm) => ({
                ...prevForm,
                transaction_type: Number(selectedValue),
            }));
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
                                clearButtonProps={{ size: 'sm', onClick: () => setForm({ ...form, transaction_type: 0 }) }}
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

                    <div className="flex justify-end">
                        <ButtonPrimary className='py-1 px-4 rounded-lg'>Simpan</ButtonPrimary>
                    </div>
                </form>

            </Card>
        </DefaultLayout>

    )
}

export default Page