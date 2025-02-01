'use client'
import ButtonPrimary from '@/components/elements/buttonPrimary'
import ButtonSecondary from '@/components/elements/buttonSecondary'
import Card from '@/components/elements/card/Card'
import ModalDefault from '@/components/fragemnts/modal/modal'
import ModalAlert from '@/components/fragemnts/modal/modalAlert'
import DefaultLayout from '@/components/layouts/DefaultLayout'
import { dateFirst, formatDate, formatDateStr } from '@/utils/helper'
import { parseDate } from '@internationalized/date'
import { DateRangePicker, ModalContent, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from '@nextui-org/react'
import React from 'react'

const Page = () => {
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

    const dateNow = new Date();
    let [date, setDate] = React.useState({
        start: parseDate((formatDate(dateFirst))),
        end: parseDate((formatDate(dateNow))),
    });

    const startDate = formatDateStr(date.start);
    const endDate = formatDateStr(date.end);
    console.log(startDate, endDate);

    return (
        <DefaultLayout>
            <Card>
                <h1 className='text-xl font-medium '>Jurnal Umum</h1>
                <p className='text-slate-500 text-small' >Semua pencatatan transaksi akan masuk dan di catat ke dalam jurnal umum</p>
                <div className="total mt-4">
                    <h1>Total Debit : Rp </h1>
                    <h1>Total Kredit: Rp </h1>
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
                <p>Edit Arsip</p>
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
