import { url } from "inspector";
import { axiosInterceptor } from "./axiosInterceptor"

export const downloadTransaction = (start_date: string, end_date: string, callback: any) => {
    axiosInterceptor.get(`/transactions/export`, {
        params: { start_date, end_date },
        responseType: 'blob'  // Mengharapkan response sebagai Blob (file)
    })
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
        });
}

export const createTransaction = async (form: any, callback: any) => {
    await axiosInterceptor.post('/transactions', form)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
            console.log(err);

        });

}

export const deleteTransaction = async (id: string, callback: any) => {
    axiosInterceptor.delete(`transactions/${id}`)
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
        });
}



export const getTransaction = (startDate: string, endDate: string, callback: any) => {
    axiosInterceptor.get('/transactions/list', { params: { start_date: startDate, end_date: endDate } })
        .then((result) => {
            callback(result.data)
        }).catch((err) => {
            callback(err);
        });

}


export const updateTransaction = async (id: string, form: any, callback: any) => {
    await axiosInterceptor.put(`transactions/${id}`, form)
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

