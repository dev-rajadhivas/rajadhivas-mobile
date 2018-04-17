/* global app */
app.filter("covertoline", function() {
    return function(v) {
        return v ? v : "-";
    };
}).filter("covertoCurrency", function($filter) {
    return function(v) {
        return v ? $filter('currency')(v, "") : "ยังไม่ระบุ";
    };
}).filter("covertoZero", function($filter) {
    return function(v) {
        return v ? v : "0";
    };
}).filter("covertotimePolicyYea", function() {
    return function(strDate) {
        if (strDate) {
            var str = {};
            var strMonthThai;
            str.Year = (new Date(strDate).getFullYear()) + 543;
            str.Month = (new Date(strDate).getMonth()) + 1;
            str.Day = (new Date(strDate).getDate());
            str.Hours = new Date(strDate).getHours();
            str.Minute = new Date(strDate).getMinutes();
            str.Seconds = new Date(strDate).getSeconds();
            str.Monththai = ["", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
            if (((str.Hours).toString()).length === 1) {
                str.Hours = "0" + str.Hours;
            }
            if (((str.Minute).toString()).length === 1) {
                str.Minute = "0" + str.Minute;
            }
            strMonthThai = str.Monththai[str.Month];
            return str.Day + " " + strMonthThai + " " + str.Year;
        }
    };
}).filter("covertotimeThai", function() {
    return function(strDate) {
        if (strDate) {
            var str = {};
            var strMonthThai;
            str.Year = (new Date(strDate).getFullYear()) + 543;
            str.Month = (new Date(strDate).getMonth()) + 1;
            str.Day = (new Date(strDate).getDate());
            str.Hours = new Date(strDate).getHours();
            str.Minute = new Date(strDate).getMinutes();
            str.Seconds = new Date(strDate).getSeconds();
            str.Monththai = ["", "ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
            if (((str.Hours).toString()).length === 1) {
                str.Hours = "0" + str.Hours;
            }
            if (((str.Minute).toString()).length === 1) {
                str.Minute = "0" + str.Minute;
            }
            strMonthThai = str.Monththai[str.Month];
            return str.Day + " " + strMonthThai + " " + str.Year + " " + str.Hours + ":" + str.Minute;
        }
    };
});
//##############################################################################
// ใส่ได้เฉพาะตัวเลขเท่านั้น
app.directive('blurToNumber', function($filter) {
    return {
        scope: {
            num: '='
        },
        link: function(scope, el, attrs) {
            // el.val($filter('currency')(scope.num, ""));

            el.bind('focus', function() {
                // el.val(scope.num);
            });

            el.bind('input', function() {
                console.log("in");
                // scope.amount = el.val();
                var ValidChars = "0123456789";
                var IsNumber = true;
                var text = "";
                for (i = 0; i < el.val().length; i++) {
                    var Char = el.val().charAt(i);
                    if (ValidChars.indexOf(Char) == -1) {
                        IsNumber = false;
                    } else {
                        text += Char;

                    }
                }
                scope.num = text;
                scope.$apply();
            });

            el.bind('blur', function() {
                // el.val($filter('currency')(scope.amount, ""));
            });
        }
    }
});
app.filter('readmore', function() {
    return function(value, wordwise, max, tail) {
        if (!value) return '';

        max = parseInt(max, 10);
        if (!max) return value;
        if (value.length <= max) return value;

        value = value.substr(0, max);
        if (wordwise) {
            var lastspace = value.lastIndexOf(' ');
            if (lastspace !== -1) {
                //Also remove . and , so its gives a cleaner result.
                if (value.charAt(lastspace - 1) === '.' || value.charAt(lastspace - 1) === ',') {
                    lastspace = lastspace - 1;
                }
                value = value.substr(0, lastspace);
            }
        }
        return value + (tail || '<b><span class="readmore-signature"> ...อ่านต่อ</span></b>');
    };
});