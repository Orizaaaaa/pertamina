import { url } from "inspector";
import { axiosInterceptor } from "./axiosInterceptor"


export const getTransaction = (callback: any) => {
    axiosInterceptor.get('/transactions/list')
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
        });
}

export const updateTransaction = async (id: string, form: any, callback: any) => {
    await axiosInterceptor.put(`/transactions/${id}`, form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
        });
}

// transaction type
export const createTransactionType = async (form: any, callback: any) => {
    await axiosInterceptor.post('/transactions-type', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
            console.log(err);

        });

}

export const getTransactionType = (callback: any) => {
    axiosInterceptor.get('/transactions-type/list')
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
        });
}

export const deleteTransactionType = async (id: string, callback: any) => {
    axiosInterceptor.delete(`transactions-type/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
        });
}

export const updateTransactionType = async (id: string, form: any, callback: any) => {
    await axiosInterceptor.put(`transactions-type/${id}`, form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
        });
}

export const getDataCart = (callback: any) => {
    axiosInterceptor.get('/balance/finance-data')
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
        });
}

