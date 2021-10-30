const CpfHelper = (function () {
    const UNFORMATED_CPF_LENGHT = 11

    const format = cpf => {
        if (cpf) {
            cpf = cpf.replace(/\D/g, "");
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
            cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2");
            cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
        }
        return cpf
    }

    const autoCompleteAndFormat = cpf => {
        if (cpf && cpf.length <= UNFORMATED_CPF_LENGHT) {
            let difference = UNFORMATED_CPF_LENGHT - cpf.length

            for (let i = 0; i < difference; i++)
                cpf = "0" + cpf
        }
        return format(cpf)
    }

    return {
        format: format,
        autoCompleteAndFormat: autoCompleteAndFormat
    }
})();

const DateHelper = (function () {
    const convertToSend = date => {
        return new Date(date)
    }

    const showDate = date => {
        if (date && date.match("T"))
            return new Date(date).toLocaleString()
        else if (date)
            return new Date(date + "T00:00:00").toLocaleDateString()
        else
            return "-"
    }

    const createDate = date => {
        return date ? new Date(date) : new Date()
    }

    const showReferenceMonth = date => {
        let newDate = "";

        if (new Date(date.replace("Z", "")).toDateString() !== 'Invalid Date') {
            newDate = new Date(date.replace("Z", ""));
            newDate = newDate.toLocaleDateString()
                .substring(3, newDate.length)
        }

        return newDate ? newDate : date;
    }

    const diffBetweenDates = (startDate, endDate) => {
        let difference = "-";

        if(startDate && startDate != 'Invalid Date'
            && endDate && endDate != 'Invalid Date') {
                startDate = new Date(startDate);
                endDate = new Date(endDate);
                
                const diffTime = Math.abs(startDate - endDate);
                const diffMinutes = Math.trunc(diffTime / (60 * 1000) % 60);
                const diffHours = Math.trunc(diffTime / (60 * 60 * 1000) % 24);
                const diffDays = Math.trunc(diffTime / (24 * 60 * 60 * 1000));
                
                const diffMinutesText = diffMinutes > 1
                    ? `${diffMinutes} minutos`
                    : `${diffMinutes} minuto`;
                const diffHoursText = diffHours > 1
                    ? `${diffHours} horas${diffMinutes ? " e" : ""}`
                    : `${diffHours} hora${diffMinutes ? " e" : ""}`;
                const diffDaysText = diffDays > 1
                    ? `${diffDays} dias${diffHours ? "," : ""}`
                    : `${diffDays} dia${diffHours ? "," : ""}`;

                difference = `${diffDays ? diffDaysText : ""} ${diffHours ? diffHoursText : ""} ${diffMinutes ? diffMinutesText : ""}.`.trim();
        }

        return difference;
    }

    return {
        createDate: createDate,
        convertToSend: convertToSend,
        showDate: showDate,
        showReferenceMonth: showReferenceMonth,
        diffBetweenDates: diffBetweenDates
    }
})();

const DialogHelper = (function () {
    const processErrorMessage = message => {
        if (message?.errorDTO?.errorDetail)
            return message.errorDTO.errorDetail
        else if (message?.errors?.length && message?.errors[0]?.errorReason)
            return message.errors[0].errorReason
        else if (message?.errors?.length && message?.errors[0]?.errorDetail)
            return message.errors[0].errorDetail
        else if (message?.message)
            return message.message
        else if (message)
            return message

        return "Ocorreu um erro inesperado. Se o erro persistir, consulte o squad backoffice."
    }

    return {
        processErrorMessage: processErrorMessage
    }
})();

const MapHelper = (function () {
    const getKey = (list, filter) => {
        if (filter && filter !== '' && list)
            return Object.keys(list).find(key => {
                if (list[key] === filter)
                    return key
            })
        else
            return filter
    }

    const getValue = (list, filter) => {
        return (filter && filter !== '' && list) ? list[filter] : ""
    }

    const sortValues = list => {
        return list ? Object.values(list).sort() : ""
    }

    return {
        getKey: getKey,
        getValue: getValue,
        sortValues: sortValues
    }
})();

const MobilePhoneHelper = (function () {
    const format = mobilePhone => {
        let phone = NumberHelper.getNumbers(mobilePhone.replace("+55", ""))

        phone = phone.replace(/^(\d)/, '($1')
        phone = phone.replace(/(.{3})(\d)/, '$1) $2')

        if (phone.length === 11)
            phone = phone.replace(/(.{1})$/, '-$1')
        else if (phone.length === 12)
            phone = phone.replace(/(.{2})$/, '-$1')
        else if (phone.length === 13)
            phone = phone.replace(/(.{3})$/, '-$1')
        else if (phone.length >= 14)
            phone = phone.replace(/(.{4})$/, '-$1')

        return phone
    }

    const getDDD = formattedMobilePhone => {
        return (formattedMobilePhone !== '') ? NumberHelper.getNumbers(formattedMobilePhone).substring(0, 2) : ''
    }

    const getPhoneNumber = formattedMobilePhone => {
        return (formattedMobilePhone !== '') ? NumberHelper.getNumbers(formattedMobilePhone).substring(2) : ''
    }

    return {
        format: format,
        getDDD: getDDD,
        getPhoneNumber: getPhoneNumber
    }
})();

const MoneyHelper = (function () {
    const convertToNumber = money => {
        money = money.replace(",", ".")
        money = Number(money.replace(/[^0-9.-]+/g, "")) || 0
        return money
    }

    return {
        convertToNumber: convertToNumber
    }
})();

const NumberHelper = (function () {
    const convertToMoney = number => {
        const zero = 0

        return (!isNaN(number) && number !== null)
            ? number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
            : zero.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    }

    const getNumbers = str => {
        return str.replace(/\D/gim, '');
    }

    return {
        convertToMoney: convertToMoney,
        getNumbers: getNumbers
    }
})();

const PaginationHelper = (function () {
    const calculatePageStart = (currentPage, currentPageSize) => {
        return currentPage * currentPageSize + 1
    }

    const calculatePageStop = (currentPage, currentPageSize, totalReceivedItens) => {
        return (currentPage + 1) * currentPageSize - (totalReceivedItens < currentPageSize ? currentPageSize - totalReceivedItens : 0)
    }

    const calculateTotalPages = (totalSize, currentPageSize) => {
        return Math.trunc(totalSize / currentPageSize) + (totalSize % currentPageSize != 0 ? 1 : 0)
    }

    const decreasePage = currentPage => {
        return currentPage - 1 > 0 ? currentPage - 1 : 0
    }

    const increasePage = (currentPage, totalPages) => {
        return currentPage + 1 < totalPages - 1 ? currentPage + 1 : totalPages - 1
    }

    return {
        calculatePageStart: calculatePageStart,
        calculatePageStop: calculatePageStop,
        calculateTotalPages: calculateTotalPages,
        decreasePage: decreasePage,
        increasePage: increasePage
    }

})();

const TextHelper = (function () {
    const replaceLineBreaks = text => {
        return text ? text.replace(/\\r\\n/g, " ") : "-"
    }

    return {
        replaceLineBreaks: replaceLineBreaks
    }
})();

const TimeHelper = (function () {
    const showTime = date => {
        return date ? new Date(date).toLocaleTimeString() : "-"
    }

    const showShortTime = date => {
        return date ? new Date(date).getHours().toString().padStart(2, "0") + ":" + new Date(date).getMinutes().toString().padStart(2, "0") : "-"
    }

    return {
        showTime: showTime,
        showShortTime: showShortTime
    }
})();

const WindowLocationHelper = (function () {
    const openNewTab = url => {
        if (url)
            window.open(`${url}`, '_blank')
    }

    return {
        openNewTab: openNewTab
    }
})();

const ZipCodeHelper = (function() {
    const format = zipCode => {
        return zipCode ? zipCode.replace(/(\d{2})(\d{3})(\d{3})$/, "$1.$2-$3") : null;
    }

    return {
        format: format
    }
})();