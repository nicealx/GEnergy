// Маска для даты
$('[data-toggle="datepicker"]').mask("99.99.9999");

// setTimeout(() => {
//   $("#modalThanks").modal("show");
// }, 1000);

// bootstrap datepicker
$('[data-toggle="datepicker"]').datepicker({
  autoHide: true,
  zIndex: 2048,
  language: "ru-RU",
  format: "dd.mm.yyyy",
});
$(document).ready(function () {
  $(".mob-btn").click(function () {
    $("nav.navbar").show();
    $("body").css("overflow", "hidden");
  });
  $(".close-btn").click(function () {
    $("nav.navbar").hide();
    $("body").css("overflow", "visible");
  });
});
$(document).ready(function () {
  dataTable = $("#example").DataTable({
    searching: true,
    lengthChange: false,
    info: false,
	ordering: true,
    // columnDefs: [
      // {
        // targets: [7],
        // visible: false,
      // },
    // ],
  });
  
  $(".thead-input").on("change", function(e) {
	  
      dataTable
		.column($(this).data('column'))
        .search($(this).val(), false, false, true)
        .draw();	  
		
  });
  
  $(".select-checkbox").on("change", function (e) {
    var searchTerms = [];
    $.each($(".select-checkbox"), function (i, elem) {
      if ($(elem).prop("checked")) {
        searchTerms.push($(this).val() );
      }
    });

    $(".submt").click(function () {
      var filterTitle = $(this).parent().parent().children("span").text();
      $("tr.filter").each(function () {
        $(this).remove();
      });
      $("thead tr").after('<tr class="filter"><th></th></tr>');
      $.each(searchTerms, function (i, val) {
        i++;
        var searchLength = searchTerms.length;
        var filterWrapStart = '<tr class="filter"><th>';
        var filterWrapEnd = "</th></tr>";
        $("tr.filter th").append(
          '<div class="filter-item" data-filter-item="' +
            val +
            '"><span>' +
            "<b>" +
            filterTitle +
            ":&nbsp;</b>" +
            val.replace("$", "") +
            '</span><svg class="remove-filter-item" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.869413 7.95032C0.543529 8.27621 0.543529 8.80458 0.869414 9.13047C1.1953 9.45636 1.72366 9.45636 2.04955 9.13047L4.99994 6.18003L7.95045 9.13058C8.27634 9.45647 8.8047 9.45647 9.13059 9.13058C9.45647 8.80469 9.45647 8.27632 9.13059 7.95043L6.18008 4.99988L9.13035 2.04957C9.45623 1.72368 9.45623 1.19531 9.13035 0.869417C8.80446 0.543528 8.2761 0.543528 7.95021 0.869417L4.99994 3.81973L2.04979 0.869529C1.7239 0.54364 1.19554 0.54364 0.869655 0.869529C0.54377 1.19542 0.54377 1.72379 0.869655 2.04968L3.81981 4.99988L0.869413 7.95032Z" fill="#B3B3B3"/></svg></div>'
        );
      });

      if (searchTerms.length > 0) {
        $(this)
          .parent()
          .parent()
          .children()
          .children(".select-placeholder")
          .text("Выбрано: " + searchTerms.length);
      } else {
        $(this)
          .parent()
          .parent()
          .children()
          .children(".select-placeholder")
          .text("Выберите");
      }
      dataTable
        .column(0)
        .search(searchTerms.join("|"), true, false, false)
        .draw();
      $(".remove-filter-item").on("click", function () {
        $(this).parent().remove();
        var removeArrayValue = $(this).parent().data("filter-item");
        searchTerms.splice($.inArray(removeArrayValue, searchTerms), 1);
        var uncheckVal = removeArrayValue.replace("$", "");
        ("");
        $('.select-checkbox[value="' + uncheckVal + '"]').prop(
          "checked",
          false
        );
        if (searchTerms.length > 0) {
          $(".select-placeholder").text("Выбрано: " + searchTerms.length);
        } else {
          $(".select-placeholder").text("Выберите");
        }
        dataTable
          .column(0)
          .search(searchTerms.join("|"), true, false, false)
          .draw();
      });
    });
  });
});

$(function () {
  $(".select-wrap").click(function (e) {
    $(this).parent().children(".select-options").slideToggle(0);
    $(".select-wrap").toggleClass("focus");
    e.stopPropagation();
  });
  $(".submt").click(function () {
    $(this).parent().hide();
    $(".select-wrap").removeClass("focus");
  });

  $(".select-options").click(function (e) {
    e.stopPropagation();
  });

  $(document).click(function () {
    $(".select-options").hide();
    $(".select-wrap").removeClass("focus");
  });
  $(".input-label").click(function () {
    $(this).parent().children("input").focus();
  });
  $(".textarea-label").click(function () {
    $(this).parent().children("textarea").focus();
  });
  $('[data-toggle="tooltip"]').tooltip();
  $("#datepicker").datepicker();
  $(".inputfile").change(function () {
    var filename = $(this)
      .val()
      .replace(/.*(\/|\\)/, "");
    var filenameLength = filename.length;
    if (filenameLength > 20) {
      var filename = filename.substr(0, 20) + "...";
    }
	
	if ($(this).get(0).files.length > 1)
	{
		filename = 'Загружено файлов: ' + $(this).get(0).files.length;
		filenameLength = filename.length;
	}	
	
    if ($(this).val() != "") {
      $(this).parent().children().children(".label-file").addClass("active");
      $(this).parent().children().children(".label-file").html("");
      $(this)
        .parent()
        .children(".label-wrap")
        .append(
          '<div class="file-label"><span>' +
            filename +
            "</span>" +
            '<svg class="reset-file" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="8" fill="#D52723"/><line x1="5.35453" y1="5.35348" x2="10.3043" y2="10.3032" stroke="white"/><line x1="10.3037" y1="5.35355" x2="5.354" y2="10.3033" stroke="white"/></svg></div>'
        );
    }
    $(".label-file-anketa + .file-label .reset-file").click(function () {
      $(this).parent().parent().children(".label-file").removeClass("active");
      $(this).parent().parent().parent().children("input").val("");
      $(this)
        .parent()
        .parent()
        .children("label")
        .html(
          '<svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.53304 0.249983C6.26638 -0.0833506 5.73304 -0.0833506 5.46638 0.249983L1.46638 4.44998C1.13304 4.78332 1.46638 5.31665 1.99971 5.31665L4.66638 5.31665C4.66638 5.31665 4.53304 8.38332 4.66638 9.98332C4.73304 10.7166 5.26638 11.3166 5.99971 11.3166C6.73304 11.3167 7.26638 10.7167 7.33304 9.98332C7.46638 8.44998 7.33304 5.31665 7.33304 5.31665L9.99971 5.31665C10.533 5.31665 10.8664 4.78332 10.533 4.38332L6.53304 0.249983Z" fill="#FF5200"/><path d="M10.6667 12.6667H1.33333C0.6 12.6667 0 13.2667 0 14.0001C0 14.4001 0.266667 14.6667 0.666667 14.6667H11.3333C11.7333 14.6667 12 14.4001 12 14.0001C12 13.2667 11.4 12.6667 10.6667 12.6667Z" fill="#FF5200"/></svg>' +
            "<span>Загрузить файл</span>"
        );
      $(this).parent().remove();
    });
    $(".reset-file").click(function () {
      $(this).parent().parent().children(".label-file").removeClass("active");
      $(this).parent().parent().parent().children("input").val("");
      $(this)
        .parent()
        .parent()
        .children("label")
        .html(
          '<svg width="25" height="18" viewBox="0 0 25 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.2528 17.7316H15.3737H14.3292H14.1036V12.5285H15.8053C16.2368 12.5285 16.4918 12.0381 16.2368 11.685L12.9266 7.10468C12.7158 6.81045 12.2793 6.81045 12.0685 7.10468L8.75828 11.685C8.50327 12.0381 8.75337 12.5285 9.18982 12.5285H10.8915V17.7316H10.6659H9.62137H5.12444C2.54986 17.5894 0.5 15.1815 0.5 12.5726C0.5 10.7729 1.47589 9.20358 2.92256 8.3552C2.79015 7.99721 2.7215 7.6147 2.7215 7.21257C2.7215 5.37358 4.2074 3.88768 6.04638 3.88768C6.4436 3.88768 6.82611 3.95634 7.1841 4.08874C8.24826 1.83292 10.5433 0.268555 13.2111 0.268555C16.6635 0.273459 19.5078 2.9167 19.8314 6.28572C22.4845 6.74179 24.5 9.19868 24.5 11.9792C24.5 14.951 22.1853 17.5256 19.2528 17.7316Z" fill="#A7A9AC"/></svg>' +
            "<span>Загрузить файл</span>"
        );
      $(this).parent().remove();
    });
  });
});
