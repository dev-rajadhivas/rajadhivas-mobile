app.config(function(ionicDatePickerProvider) {
    var toDay = new Date();
    var fromYear = toDay.getFullYear() - 50;
    var fromTo = toDay.getFullYear() + 10;
    var monthsEng = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    var monthsTh = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    var weeksEng = ["S", "M", "T", "W", "T", "F", "S"];
    var weeksTh = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];
    var datePickerObj = {
        inputDate: toDay,
        titleLabel: 'ปฏิทิน',
        todayLabel: "วันนี้",
        setLabel: null,
        closeLabel: "ปิด",
        mondayFirst: false,
        weeksList: weeksTh,
        monthsList: monthsTh,
        templateType: 'popup',
        showTodayButton: true,
        dateFormat: 'dd MMMM yyyy',
        closeOnSelect: false,
        disableWeekdays: [],
        from: new Date(fromYear, 1, 1), //Optional
        to: new Date(fromTo, 1, 1), //Optional
        next_btn_section: false
    };
    ionicDatePickerProvider.configDatePicker(datePickerObj);
});
