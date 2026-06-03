

export const getApiErrorMessage = (error, fallbackMessage = "요청 처리 중 오류가 발생했습니다.") => {
    return (
        error?.response?.data?.message ||
        fallbackMessage
    );
};

export const getApiErrorCode = (error) => {
    return error?.response?.data?.errorCode || null;
};

