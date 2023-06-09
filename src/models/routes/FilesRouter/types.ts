export type UploadFilesReq_T = {
    files: {
        file: any
    },
    body: {
        uid: string,
        session_id: string
    }
}