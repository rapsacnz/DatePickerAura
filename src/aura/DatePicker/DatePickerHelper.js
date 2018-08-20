({

  changeYear: function(component, newYear, date) {

    var currentMonth = component.get("v.month");
    var currentYear = component.get("v.year");

    if (!currentYear) {
      currentYear = this.date.current.year();
    }

    var currentDate = new Date(currentYear, currentMonth, date);
    var targetDate = new Date(newYear, currentDate.getMonth(), 1);

    var daysInMonth = this.numDays(currentMonth, currentYear);

    if (daysInMonth < date) { // The target month doesn't have the current date. Just set it to the last date.
      date = daysInMonth;
    }
    this.setDateValues(component, targetDate, date);
  },

  changeMonth: function(component, monthChange) {

    var currentYear = component.get("v.year");
    var currentMonth = component.get("v.month");
    var currentDay = component.get("v.date");

    var currentDate = new Date(currentYear, currentMonth, currentDay);
    var targetDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + monthChange, 1);

    var daysInMonth = this.numDays(currentMonth, currentYear);

    if (daysInMonth < currentDay) { // The target month doesn't have the current date. Just set it to the last date.
      currentDay = daysInMonth;
    }
    this.setDateValues(component, targetDate, currentDay);
  },

  goToToday: function(component, event) {
    var currentYear = this.date.current.year();
    var currentMonth = this.date.current.month.integer();
    var currentDay = this.date.current.day();

    var newYear = component.find("yearSelect").set("v.value", currentYear);

    var targetDate = new Date(currentYear, currentMonth, currentDay);
    this.setDateValues(component, targetDate, currentDay);
  },

  dateCompare: function(date1, date2) {
    if (date1.getFullYear() !== date2.getFullYear()) {
      return date1.getFullYear() - date2.getFullYear();
    } else {
      if (date1.getMonth() !== date2.getMonth()) {
        return date1.getMonth() - date2.getMonth();
      } else {
        return date1.getDate() - date2.getDate();
      }
    }
  },

  /**
   * Java style date comparisons. Compares by day, month, and year only.
   */
  dateEquals: function(date1, date2) {
    return date1 && date2 && this.dateCompare(date1, date2) === 0;
  },

  /**
   * Find the cell component for a specific date in a month.
   * @date - Date object
   */
  findDateComponent: function(component, date) {
    var firstDate = new Date(date.getTime());
    firstDate.setDate(1);
    var initialPos = firstDate.getDay();
    var pos = initialPos + date.getDate() - 1;

    return component.find(pos);
  },

  /**
   * generates the days for the current selected month.
   */
  generateMonth: function(component) {
    var dayOfMonth = component.get("v.date");
    var month = component.get("v.month");
    var year = component.get("v.year");
    var date = new Date(year, month, dayOfMonth);
    var minDate = component.get("v.minDate");

    //var selectedDate = new Date(Date.UTC(year, month, dayOfMonth, 0, 0, 0));
    var selectedDate = new Date(year, month, dayOfMonth);

    var today = new Date();
    var d = new Date();
    d.setDate(1);
    d.setFullYear(year);
    d.setMonth(month);
    // java days are indexed from 1-7, javascript 0-6
    // The startPoint will indicate the first date displayed at the top-left
    // corner of the calendar. Negative dates in JS will subtract days from
    // the 1st of the given month
    var firstDayOfWeek = $A.get("$Locale.firstDayOfWeek") - 1; // In Java, week day is 1 - 7
    var startDay = d.getDay();
    var firstFocusableDate;
    while (startDay !== firstDayOfWeek) {
      d.setDate(d.getDate() - 1);
      startDay = d.getDay();
    }
    for (var i = 0; i < 41; i++) {
      var cellCmp = component.find(i);
      if (cellCmp) {
        var dayOfWeek = d.getDay();
        var tdClass = '';

        if (d.getMonth() === month - 1 || d.getFullYear() === year - 1) {
          cellCmp.set("v.ariaDisabled", "true");
          tdClass = 'slds-disabled-text';
        } else if (d.getMonth() === month + 1 || d.getFullYear() === year + 1) {
          cellCmp.set("v.ariaDisabled", "true");
          tdClass = 'slds-disabled-text';
        }

        if (d.getMonth() === month && d.getDate() === 1) {
          firstFocusableDate = cellCmp;
        }

        if (this.dateEquals(d, today)) {
          tdClass += ' slds-is-today';
        }
        if (this.dateEquals(d, selectedDate)) {
          cellCmp.set("v.ariaSelected", "true");
          tdClass += ' slds-is-selected';
          firstFocusableDate = cellCmp;
        }

        if (minDate && minDate.getTime() > d.getTime()) {
          cellCmp.set("v.ariaDisabled", "true");
          tdClass = 'slds-disabled-text';
        }

        cellCmp.set("v.tabIndex", -1);
        cellCmp.set("v.label", d.getDate());
        cellCmp.set("v.tdClass", tdClass)

        var dateStr = d.getFullYear() + "-" +
          ('0' + (d.getMonth() + 1)).slice(-2) + "-" +
          ('0' + d.getDate()).slice(-2);
        cellCmp.set("v.value", dateStr);

      }
      d.setDate(d.getDate() + 1);
    }
    if (firstFocusableDate) {
      firstFocusableDate.set("v.tabIndex", 0);
    }
    component.set("v._setFocus", true);
  },

  getEventTarget: function(e) {
    return (window.event) ? e.srcElement : e.target;
  },

  goToFirstOfMonth: function(component) {
    var date = new Date(component.get("v.year"), component.get("v.month"), 1);
    var targetId = date.getDay();
    var targetCellCmp = component.find(targetId);
    targetCellCmp.getElement().focus();
    component.set("v.date", 1);
  },

  goToLastOfMonth: function(component) {
    var date = new Date(component.get("v.year"), component.get("v.month") + 1, 0);
    var targetCellCmp = this.findDateComponent(component, date);
    if (targetCellCmp) {
      targetCellCmp.getElement().focus();
      component.set("v.date", targetCellCmp.get("v.label"));
    }
  },

  renderGrid: function(component) {
    this.generateMonth(component);
  },

  selectDate: function(component, event) {
    var source = event.getSource();

    var firstDate = new Date(component.get("v.year"), component.get("v.month"), 1);
    var firstDateId = parseInt(firstDate.getDay(), 10);

    // need to account for start of week differences when comparing indices
    var firstDayOfWeek = $A.get("$Locale.firstDayOfWeek") - 1; // The week days in Java is 1 - 7
    var offset = 0;
    if (firstDayOfWeek !== 0) {
      if (firstDateId >= firstDayOfWeek) {
        offset -= firstDayOfWeek;
      } else {
        offset += (7 - firstDayOfWeek);
      }
    }

    firstDateId += offset;
    var lastDate = new Date(component.get("v.year"), component.get("v.month") + 1, 0);
    var lastDateCellCmp = this.findDateComponent(component, lastDate);
    var lastDateId = parseInt(lastDateCellCmp.getLocalId(), 10);
    lastDateId += offset;

    var currentId = parseInt(source.getLocalId(), 10);
    var currentDate = source.get("v.label");
    var targetDate;
    if (currentId < firstDateId) { // previous month
      targetDate = new Date(component.get("v.year"), component.get("v.month") - 1, currentDate);
      this.setDateValues(component, targetDate, targetDate.getDate());

    } else if (currentId > lastDateId) { // next month
      targetDate = new Date(component.get("v.year"), component.get("v.month") + 1, currentDate);
      this.setDateValues(component, targetDate, targetDate.getDate());

    } else {
      component.set("v.date", currentDate);
    }
    var selectedDate = new Date(component.get("v.year"), component.get("v.month"), component.get("v.date"));

    var paddedMonth = ('0' + (component.get("v.month") + 1)).slice(-2);
    var paddedDay = ('0' + component.get("v.date")).slice(-2);
    var dateStr = component.get("v.year") + "-" + paddedMonth + "-" + paddedDay;

    component.set("v.selectedDate", selectedDate);
    component.set("v.value", dateStr);

    this.validateSelectedDate(component, selectedDate);

    //finally fire the event to tell parent components we have changed the date:
    var dateChangeEvent = component.getEvent("dateChangeEvent");
    dateChangeEvent.setParams({ "value": dateStr });
    dateChangeEvent.fire();

  },

  setFocus: function(component) {
    var date = component.get("v.date");
    if (!date) {
      date = 1;
    }
    var year = component.get("v.year");
    var month = component.get("v.month");
    var cellCmp = this.findDateComponent(component, new Date(year, month, date));
    if (cellCmp) {
      cellCmp.getElement().focus();
    }
  },

  updateNameOfWeekDays: function(component) {
    var firstDayOfWeek = $A.get("$Locale.firstDayOfWeek") - 1; // The week days in Java is 1 - 7
    var namesOfWeekDays = $A.get("$Locale.nameOfWeekdays");
    var days = [];
    if (this.isNumber(firstDayOfWeek) && $A.util.isArray(namesOfWeekDays)) {
      for (var i = firstDayOfWeek; i < namesOfWeekDays.length; i++) {
        days.push(namesOfWeekDays[i]);
      }
      for (var j = 0; j < firstDayOfWeek; j++) {
        days.push(namesOfWeekDays[j]);
      }
      component.set("v._namesOfWeekdays", days);
    } else {
      component.set("v._namesOfWeekdays", namesOfWeekDays);
    }
  },

  isNumber: function(obj) {
    return !isNaN(parseFloat(obj))
  },

  numDays: function(currentMonth, currentYear) {
    // checks to see if february is a leap year otherwise return the respective # of days
    return currentMonth === 1 && (((currentYear % 4 === 0) && (currentYear % 100 !== 0)) || (currentYear % 400 === 0)) ? 29 : this.l10n.daysInMonth[currentMonth];

  },

  setDateValues: function(component, fullDate, dateNum) {

    //var paddedMonth = String("0" + fullDate.getMonth()).slice(-2)
    var paddedMonth = ('0' + (fullDate.getMonth() + 1)).slice(-2);
    console.log(paddedMonth);

    component.set("v.year", fullDate.getFullYear());
    component.set("v.month", fullDate.getMonth());
    component.set("v.monthName", this.l10n.months.longhand[fullDate.getMonth()]);
    component.set("v.date", dateNum);
    component.set("v.selectedDate", fullDate);

    this.validateSelectedDate(component, fullDate);

  },

  generateYearOptions: function(component, fullDate) {

    var years = [];
    var startYear = component.get("v.startYear");
    var finishYear = component.get("v.finishYear");
    if (!component.get("v.extendedYearRange") || !startYear || !finishYear || (startYear >= finishYear)) {
      startYear = fullDate.getFullYear() - 1;
      finishYear = startYear + 10
    }
    var thisYear = fullDate.getFullYear();

    for (var i = startYear; i <= finishYear; i++) {
      years.push({ "class": "optionClass", label: i, value: i });
    }
    try {
      years[thisYear].selected = true;
    } catch (e) {
      //can't select this year, so don't worry 'bout it
    }

    component.set("v.options", years);
  },

  handleManualInput: function(component, event) {
    console.log(JSON.stringify(event));
    //var params = event.getParam('arguments');
    var params = event.getParam('data');
    if (params) {
      var date = params.date;
      component.set("v.value", date);
      this.handleManualDateChange(component);
    }
  },

  handleManualDateChange: function(component) {

    var format = component.get("v.formatSpecifier");
    var datestr = component.get("v.value");
    var langLocale = $A.get("$Locale.langLocale");

    //if a person has deliberately cleared the date, respect that.
    if ($A.util.isEmpty(datestr)) {
      this.clearDate(component);
      return;
    }

    var currentDate = this.parseInputDate(component, datestr);
    this.setDateValues(component, currentDate, currentDate.getDate());

    // Set the first day of week
    this.updateNameOfWeekDays(component);
    this.generateYearOptions(component, currentDate);

    var selectedDate = new Date(component.get("v.year"), component.get("v.month"), component.get("v.date"));

    var paddedMonth = ('0' + (component.get("v.month") + 1)).slice(-2);
    var paddedDay = ('0' + component.get("v.date")).slice(-2);
    var dateStr = component.get("v.year") + "-" + paddedMonth + "-" + paddedDay;
    console.log(dateStr);

    component.set("v.selectedDate", selectedDate);
    component.set("v.value", dateStr);

    this.validateSelectedDate(component, selectedDate);

    //finally fire the event to tell parent components we have changed the date:
    var dateChangeEvent = component.getEvent("dateChangeEvent");
    dateChangeEvent.setParams({ "value": dateStr });
    dateChangeEvent.fire();

    console.log('manual change: selectedDate: ' + selectedDate);
    console.log('manual change: dateStr: ' + dateStr);
  },

  clearDate: function(component) {

    component.set("v.selectedDate", '');
    component.set("v.value", '');

    //finally fire the event to tell parent components we have changed the date:
    var dateChangeEvent = component.getEvent("dateChangeEvent");
    dateChangeEvent.setParams({ "value": '' });
    dateChangeEvent.fire();

    this.validateSelectedDate(component, '');

  },

  validateSelectedDate: function(component, selectedDate) {

    var minDate = component.get("v.minDate");
    if (selectedDate && minDate > selectedDate) {
      component.set("v._error", true);
      component.set("v._errorMessage", "Date cannot be before " + ((minDate.getMonth() + 1) + '/' + minDate.getDate() + '/' + minDate.getFullYear()));
    } else {
      component.set("v._error", false);
      component.set("v._errorMessage", "");
    }
  },

  parseInputDate: function(component, datestr) {
    var parsedDate = $A.localizationService.parseDateTime(datestr, 'MM/DD/YYYY');
    var timezone = $A.get("$Locale.timezone");

    //ok try this format
    if (parsedDate == null || !this.isDateValid(parsedDate)) {
      parsedDate = $A.localizationService.parseDateTime(datestr, 'yyyy-MM-dd');
    }

    //try, try again
    if (parsedDate == null || !this.isDateValid(parsedDate)) {
      $A.localizationService.getToday(timezone, function(today) {
        parsedDate = $A.localizationService.parseDateTime(today, 'yyyy-MM-dd');
      });
    }
    return parsedDate;
  },

  isDateValid: function(date) {
    if (Object.prototype.toString.call(date) === "[object Date]") {
      // it is a date
      if (isNaN(date.getTime())) { // d.valueOf() could also work
        // date is not valid
        return false;
      } else {
        // date is valid
        return true;
      }
    } else {
      // not a date
      return false;
    }
  },

  l10n: {
    weekdays: {
      shorthand: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      longhand: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    },
    months: {
      shorthand: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      longhand: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    },
    daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
    firstDayOfWeek: 0
  },

  date: {
    current: {
      year: function() {
        return new Date().getFullYear();
      },
      month: {
        integer: function() {
          return new Date().getMonth();
        },
        string: function(shorthand) {
          var month = new Date().getMonth();
          return monthToStr(month, shorthand);
        }
      },
      day: function() {
        return new Date().getDate();
      }
    }
  },

  getOffset: function(el) {
    var _x = 0;
    var _y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      _x += el.offsetLeft - el.scrollLeft;
      _y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return { top: _y, left: _x };
  },

  hideOnClickOutside: function(component, element) {
    const outsideClickListener = event => {
      console.log('handle click outside');
      console.log('element:' + element.valueOf());
      if (!element.contains(event.target)) { // or use: event.target.closest(selector) === null
        if (this.isVisible(element)) {

          element.classList.add('slds-hide');

          removeClickListener()
        } else {
          console.log('not visible');
        }
      }
    }

    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener)
    }

    document.addEventListener('click', outsideClickListener);
  },

  isVisible: function(elem) {
    return (!!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length));
  }

});