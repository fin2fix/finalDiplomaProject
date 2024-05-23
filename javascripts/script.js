function details_panel() {
  $(".js-open_detailspanel").click(function (e) {
    var t = $(this).attr("href").replace(/#!/, "");
    window.location.href = "/" + t.toLowerCase();
  }),
    $(".js-open_detailspanel_old").click(function (e) {
      e.preventDefault();
      var t = $(this).attr("href").replace(/#!/, ""),
        n = $("#" + t),
        a = (n.outerHeight(), $("#" + t + "_id").html()),
        r = $("#" + t + "_name").html(),
        o = ($(".Product").width(), $("#" + t + "_details").html()),
        i =
          ($("#" + t + "_aa").html(),
          $("#" + t + "_ing").html(),
          $("#" + t + "_image").html()),
        s = $("#" + t + "_highlightimage").html(),
        l =
          "" == s
            ? ""
            : '<p class="mediumText italic smallestMarginTop">Personalised message handmade with icing sugar.</p>';
      if ((clearTimeout(stopTrigger), "" == l)) pagHidden = "hide";
      else {
        pagHidden = "";
        var d = function () {
          var e = !1;
          $("#" + t + "-info .Pagination")
            .children()
            .each(function () {
              0 == e &&
                0 == $(this).hasClass("active") &&
                ((e = !0),
                $(this).trigger("click"),
                (stopTrigger = setTimeout(d, 5e3)));
            });
        };
        stopTrigger = setTimeout(d, 5e3);
      }
      $("#" + t + "-info").length
        ? ($("body").addClass("is-detailsPanelOpen"),
          $("#" + t + "-info").addClass("is-active"))
        : ($(function () {
            $(".DetailsPanel").html(
              $(
                '<div class="DetailsPanel-inner" id="' +
                  t +
                  '-info"><a class="DetailsPanel-close js-close_detailspanel"></a><div class="Grid"><div class="DetailsPanel-grid"><div class="spinner"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div><div class="DetailsPanel-image"><img src="' +
                  i +
                  '" alt="' +
                  r +
                  '" class="active" /><img src="' +
                  s +
                  '" alt="' +
                  r +
                  '" /></div><div class="Pagination ' +
                  pagHidden +
                  '"><a class="Pagination-link active"></a><a class="Pagination-link"></a></div></div><div class="DetailsPanel-grid"><div class="DetailsPanel-content"><div class="DetailsPanel-title">' +
                  r +
                  '</div><p class="mediumLightText">' +
                  o +
                  "</p>" +
                  l +
                  '<a id="reviewsLink_' +
                  a +
                  '" class="reviewsLink openReviews">Reviews</a><a id="reviewsFirstLink_' +
                  a +
                  '" class="reviewsLink openReviews">BE THE FIRST TO REVIEW THIS PRODUCT!</a></div></div></div><div class="Accordion"><div class="Accordion-grid"><div class="Accordion-half"><div class="Accordion-title">Nutritional &amp; allergen information</div><div id="nutritionalContent" class="Accordion-content ingredientsMadeToOrderInfo"></div></div><div class="Accordion-half sideBorder"><div class="Accordion-title Reviews">Reviews</div><div class="Accordion-content"><div id="reviews_' +
                  a +
                  '"></div><form action="" method="post" id="reviewForm" name="" class="" target="_blank" novalidate><span id="reviewSubmitTitle_' +
                  a +
                  '" class="smallerTitle">Submit your own review</span><div id="reviewSpinner_' +
                  a +
                  '" class="spinner hiddenForm"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></div><div id="reviewFormFields_' +
                  a +
                  '"><fieldset class="FormFields"><label for="mce-FNAME_' +
                  a +
                  '">First Name <span class="red">*</span></label><span class="hiddenForm">must be completed!</span><input type="text" value="" name="FNAME" class="" id="mce-FNAME_' +
                  a +
                  '"/><label for="mce-LNAME_' +
                  a +
                  '">Last Name <span class="red">*</span></label><span class="hiddenForm">must be completed!</span><input type="text" value="" name="LNAME" class="" id="mce-LNAME_' +
                  a +
                  '"/><label for="mce-EMAIL_' +
                  a +
                  '">Email <span class="red">*</span></label><span class="hiddenForm">must be completed!</span><input type="email" value="" name="EMAIL" class="required email" id="mce-EMAIL_' +
                  a +
                  '"/><label for="mce-REVIEW_' +
                  a +
                  '">Review <span class="red">*</span></label><span class="hiddenForm">must be completed!</span><textarea id="mce-REVIEW_' +
                  a +
                  '" class=""></textarea></fieldset><button type="button" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="redButton" onclick="javascript:submitReview(' +
                  a +
                  ')">Send Review</button></div></form></div></div></div></div><a class="textCloseButton js-close_detailspanel">Back to products</a></div>'
              ).addClass("is-active")
            ),
              $("body").addClass("is-detailsPanelOpen"),
              $.post("/getreviewsforproduct", { productId: a }, function (e) {
                for (var t = "", n = 0; n < e.length; n++)
                  t +=
                    '<p class="mediumText"><span class="bold">' +
                    e[n].name +
                    "</span> “" +
                    e[n].review +
                    "”</p>";
                $("#reviews_" + a).html(t),
                  0 == e.length
                    ? ($("#reviewsLink_" + a).hide(),
                      $("#reviewsFirstLink_" + a).show())
                    : ($("#reviewsFirstLink_" + a).hide(),
                      $("#reviewsLink_" + a).html(
                        "Reviews (" + e.length + ")"
                      ));
              }).fail(function (e) {
                console.log(e);
              });
          }),
          inlineIngredients($(this).data("ingredient-code")));
    }),
    $(document).on("click", ".js-close_detailspanel", function () {
      $("body").removeClass("is-detailsPanelOpen"),
        $(".DetailsPanel-inner").removeClass("is-active");
    });
}
function submitReview(e) {
  validateInline($("#mce-FNAME_" + e)) &
    validateInline($("#mce-EMAIL_" + e)) &
    validateInline($("#mce-REVIEW_" + e)) &&
    validateEmail($("#mce-EMAIL_" + e)) &&
    ($("#reviewSpinner_" + e).removeClass("hiddenForm"),
    $("#reviewFormFields_" + e).addClass("hiddenForm"),
    $.post(
      "/submitreview",
      {
        productId: e,
        reviewName: $("#mce-FNAME_" + e).val(),
        reviewEmail: $("#mce-EMAIL_" + e).val(),
        reviewContent: $("#mce-REVIEW_" + e).val(),
        emailOpt: $("#mce-EMAILOPT_" + e).prop("checked"),
      },
      function (t) {
        $("#reviewSpinner_" + e).addClass("hiddenForm"),
          $("#reviewSubmitTitle_" + e).html(
            '<div class="microWrap"><img class="smallMarginTop bigMarginBottom" alt="Gingerbread man illustration" src="/images/illustrations/ginger_man.png" width="155" /><h3 class="mediumTitle bigMarginBottom">Thanks for your review!</h3></div>'
          );
      }
    ).fail(function () {
      $("#reviewSpinner_" + e).addClass("hiddenForm"),
        $("#reviewSubmitTitle_" + e).html(
          "There was a problem submitting your review"
        );
    }));
}
function validateEmail(e) {
  var t =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    n = t.test(e.val());
  return (
    n
      ? (e.prev().removeClass("Incomplete"), e.prev().addClass("hiddenForm"))
      : (e.prev().html("invalid email!"),
        e.prev().removeClass("hiddenForm"),
        e.prev().addClass("Incomplete")),
    n
  );
}
function validateConfirmEmail(e, t) {
  var n = e.val(),
    a = n.indexOf("@"),
    r = n.lastIndexOf("."),
    o = !0;
  return (
    (a < 1 || r < a + 2 || r + 2 >= n.length) && (o = !1),
    o
      ? e.val() != t.val()
        ? ((o = !1),
          e.prev().removeClass("hiddenForm"),
          e.prev().addClass("Incomplete"),
          e.prev().html("emails do not match!"),
          animated ||
            ((animated = !0),
            $("#js-displayError").removeClass("hiddenForm"),
            $("html, body").animate(
              {
                scrollTop:
                  $("#js-displayError").offset().top -
                  parseInt($(".Header").height()),
              },
              200
            )))
        : (e.prev().removeClass("Incomplete"),
          e.prev().addClass("hiddenForm"),
          e.prev().html("must be completed!"))
      : (e.prev().removeClass("hiddenForm"),
        e.prev().addClass("Incomplete"),
        e.prev().html("enter a valid email!"),
        animated ||
          ((animated = !0),
          $("#js-displayError").removeClass("hiddenForm"),
          $("html, body").animate(
            {
              scrollTop:
                $("#js-displayError").offset().top -
                parseInt($(".Header").height()),
            },
            200
          ))),
    o
  );
}
function validateInline(e) {
  var t = "undefined" !== e.val() && $.trim(e.val()).length > 0;
  return (
    t
      ? (e.prev().removeClass("Incomplete"), e.prev().addClass("hiddenForm"))
      : (e.prev().html("must be completed!"),
        e.prev().removeClass("hiddenForm"),
        e.prev().addClass("Incomplete")),
    t
  );
}
function shops() {
  $(".shops_infopanel").click(function () {
    var e = $(this).attr("data-area-ref");
    $("#shopInfo").html($("#shops_" + e).html());
  });
}
function swapCakeProducts(e) {
  $(".candc").addClass("hide"), $(".candc-" + e).removeClass("hide");
}
function foodcategory_info() {
  $(".js-sub_infopanel").click(function () {
    loadPanel($(this));
  });
}
function loadPanel(e) {
  ignoreFood = !0;
  var t = e.attr("data-foodcategory-ref");
  $("#foodMenu")
    .children()
    .each(function () {
      var e = $(this).children(":first").attr("data-foodcategory-ref");
      e == t
        ? $(this).children(":first").addClass("activeLink")
        : $(this).children(":first").removeClass("activeLink");
    }),
    $("#foodInfoPanel").html($("#category_" + t).html()),
    !ignorePushState &&
      Modernizr.history &&
      (history.pushState({}, "", "/" + e.data("pushstate-url")),
      (pushStateActive = !0)),
    $("#foodInfoPanel")
      .find("img")
      .each(function () {
        if ($(this).data("lazyload")) {
          var e = $(this),
            t = new Image();
          (t.onload = function () {
            e.attr("src", e.data("lazyload")),
              e.show(),
              e.animate({ opacity: 1 });
          }),
            (t.src = $(this).data("lazyload"));
        }
      });
}
function loadFoodPanel() {
  var e = window.location.pathname,
    t = e.split("/");
  (t = $.grep(t, function (e) {
    return e;
  })),
    panelOpen ||
      "food" != t ||
      ($(".InfoPanel").fadeOut(), $("#Carousel").fadeIn()),
    $("#foodMenu")
      .find("a")
      .each(function () {
        if ($(this).data("pushstate-url") == t) {
          (ignorePushState = !0), loadPanel($(this));
          var e = $(".InfoPanel").outerHeight(!0);
          $(".Page").animate({ height: e }, function () {
            panelOpen || ($(".InfoPanel").fadeIn(), $("#Carousel").fadeOut());
          });
          var n = $(".PageNav").offset().top;
          $(window).scrollTop(n), (ignorePushState = !1);
        }
      });
}
function optionBack(e) {
  $(".ingredientOptionPanel").addClass("hide"),
    $("#ingredientOptionPanel_" + (e - 1)).removeClass("hide"),
    $("#loaderContainer").addClass("hide"),
    $(".ingredientsMadeToOrderInfo").addClass("hide"),
    (ignoreBecauseOfBack = !0),
    optionIds.pop();
}
function toggleIngredientCategory(e) {
  "MO" == e
    ? ($("#moCategory").removeClass("hide"),
      $("#rmCategory").addClass("hide"),
      $("#moButton").addClass("categoryButton--active"),
      $("#rmButton").removeClass("categoryButton--active"))
    : ($("#moCategory").addClass("hide"),
      $("#rmCategory").removeClass("hide"),
      $("#rmButton").addClass("categoryButton--active"),
      $("#moButton").removeClass("categoryButton--active"));
}
function ingredients_options() {
  $(".ingredientOption").click(function () {
    (ignoreBecauseOfBack = !1),
      $(".ingredientOptionPanel").addClass("hide"),
      $("#ingredientOptionPanel_" + $(this).data("next")).length
        ? ($("#ingredientOptionPanel_" + $(this).data("next")).removeClass(
            "hide"
          ),
          $(".crumb_" + (parseInt($(this).data("next")) - 1)).html(
            $(this).data("value")
          ),
          optionIds.push($(this).data("id")))
        : ($(".crumb_" + (parseInt($(this).data("next")) - 1)).html(
            $(this).data("value")
          ),
          $("#ingredientOptionPanel_final").removeClass("hide"),
          optionIds.push($(this).data("id")),
          $(".optionIngredients").html(""),
          $("#loaderContainer").removeClass("hide"),
          $.post(
            "/ingredientoptionslookup",
            { prodId: $("#productId").val(), optionIds: optionIds },
            function (e) {
              if (
                (console.log(e),
                $("#loaderContainer").addClass("hide"),
                !ignoreBecauseOfBack)
              ) {
                for (
                  var t = 0,
                    n = 0,
                    a = 0,
                    r = 0,
                    o = 0,
                    i = 0,
                    s = 0,
                    l = 0,
                    d = 0,
                    c = 0,
                    u = 0,
                    p = 0,
                    f = 0,
                    h = 0,
                    m = 0,
                    v = 0,
                    g = 0,
                    y = 0,
                    b = !1,
                    C = !1,
                    w = new Array(),
                    x = 0,
                    T = 0;
                  T < e.length;
                  T++
                )
                  e[T].gramsForProduct > 0 &&
                    (x += parseInt(e[T].gramsForProduct));
                for (var T = 0; T < e.length; T++) {
                  if (e[T].gramsForProduct > 0) {
                    var k = e[T].gramsForProduct / x;
                    "" != e[T].energyKjHundred &&
                      (c += parseFloat(e[T].energyKj) * k),
                      "" != e[T].energyKcalHundred &&
                        (u += parseFloat(e[T].energyKcal) * k),
                      "" != e[T].fatHundred && (p += parseFloat(e[T].fat) * k),
                      "" != e[T].saturatesHundred &&
                        (f += parseFloat(e[T].saturates) * k),
                      "" != e[T].carbohydratesHundred &&
                        (h += parseFloat(e[T].carbohydrates) * k),
                      "" != e[T].sugarsHundred &&
                        (m += parseFloat(e[T].sugars) * k),
                      "" != e[T].fibreHundred &&
                        (v += parseFloat(e[T].fibre) * k),
                      "" != e[T].proteinHundred &&
                        (g += parseFloat(e[T].protein) * k),
                      "" != e[T].saltHundred &&
                        (y += parseFloat(e[T].salt) * k);
                    var S = e[T].gramsForProduct / 100;
                    "" != e[T].energyKj && (t += parseFloat(e[T].energyKj * S)),
                      "" != e[T].energyKcal &&
                        (n += parseFloat(e[T].energyKcal * S)),
                      "" != e[T].fat && (a += parseFloat(e[T].fat * S)),
                      "" != e[T].saturates &&
                        (r += parseFloat(e[T].saturates * S)),
                      "" != e[T].carbohydrates &&
                        (o += parseFloat(e[T].carbohydrates * S)),
                      "" != e[T].sugars && (i += parseFloat(e[T].sugars * S)),
                      "" != e[T].fibre && (s += parseFloat(e[T].fibre * S)),
                      "" != e[T].protein && (l += parseFloat(e[T].protein * S)),
                      "" != e[T].salt && (d += parseFloat(e[T].salt * S));
                  }
                  null != e[T].allergens && (w = w.concat(e[T].allergens)),
                    0 == parseInt(e[T].suitableForVegetarians) && (b = !1),
                    0 == parseInt(e[T].suitableForVegans) && (C = !1),
                    "" != $.trim(e[T].ingredients) &&
                      "." != $.trim(e[T].ingredients) &&
                      ("" != $("#optionIngredients_" + e[T].id).html()
                        ? $("#optionIngredients_" + e[T].id).html(
                            $("#optionIngredients_" + e[T].id).html() +
                              "<br /><br />" +
                              e[T].shortDescription +
                              ": " +
                              e[T].ingredients
                          )
                        : $("#optionIngredients_" + e[T].id).html(
                            e[T].shortDescription + ": " + e[T].ingredients
                          ));
                }
                $("#energyKj").html(Math.round(c).toFixed(0)),
                  $("#energyKcal").html(Math.round(u).toFixed(0)),
                  $("#fat").html(p.toFixed(2)),
                  $("#saturates").html(f.toFixed(2)),
                  $("#carbohydrates").html(h.toFixed(2)),
                  $("#sugars").html(m.toFixed(2)),
                  $("#fibre").html(v.toFixed(2)),
                  $("#protein").html(g.toFixed(2)),
                  $("#salt").html(y.toFixed(2)),
                  $("#energyKjServing").html(Math.round(t).toFixed(0)),
                  $("#energyKcalServing").html(Math.round(n).toFixed(0)),
                  $("#fatServing").html(a.toFixed(2)),
                  $("#saturatesServing").html(r.toFixed(2)),
                  $("#carbohydratesServing").html(o.toFixed(2)),
                  $("#sugarsServing").html(i.toFixed(2)),
                  $("#fibreServing").html(s.toFixed(2)),
                  $("#proteinServing").html(l.toFixed(2)),
                  $("#saltServing").html(d.toFixed(2));
                for (var I = "", T = 0; T < w.length; T++)
                  T > 0 && (I += ", "), (I += w[T]);
                "" == I && (I = "This product has no allergens."),
                  $("#allergenList").html(I);
                var D = "Suitable for vegetarians and vegans.";
                0 == b && 0 == C
                  ? (D = "Not suitable for vegetarians or vegans.")
                  : 0 == b &&
                    (D = "Suitable for vegetarians. Not suitable for vegans."),
                  $("#dietaryAdvice").html(D),
                  $(".ingredientsMadeToOrderInfo").removeClass("hide");
              }
            }
          ).fail(function (e) {
            console.log(e), $("#loaderContainer").addClass("hide");
          }));
  }),
    $(".ingredientsAccordion").click(function () {
      var e = !0;
      $(this).hasClass("accordionActive") && (e = !1),
        $(".ingredientsAccordion").removeClass("accordionActive"),
        e && $(this).addClass("accordionActive");
    });
}
function inlineIngredients(e) {
  null !== request && request.abort(),
    (request = $.post(
      "/ingredientinfopanellookup",
      { prodId: e },
      function (e) {
        if (
          (console.log(e),
          $("#loaderContainer").addClass("hide"),
          !ignoreBecauseOfBack)
        ) {
          var t = 0,
            n = 0,
            a = 0,
            r = 0,
            o = 0,
            i = 0,
            s = 0,
            l = 0,
            d = 0,
            c = 0,
            u = 0,
            p = 0,
            f = 0,
            h = 0,
            m = 0,
            v = 0,
            g = 0,
            y = 0,
            b = !1,
            C = !1,
            w = new Array(),
            x = 0;
          e.length > 0 &&
            ($("#unitType").html(
              "Per " +
                ("" == e[0].unitDescription ? "Serving" : e[0].unitDescription)
            ),
            $("#unitTypeMobile").html(
              "" == e[0].unitDescription ? "Serving" : e[0].unitDescription
            ),
            $("#optionIngredients").html(e[0].ingredients));
          for (var T = 0; T < e.length; T++)
            e[T].gramsForProduct > 0 && (x += parseInt(e[T].gramsForProduct));
          for (var T = 0; T < e.length; T++) {
            var k = 1,
              S = 1;
            e[T].gramsForProduct > 0 &&
              ((k = e[T].gramsForProduct / x),
              (S = e[T].gramsForProduct / 100)),
              "" != e[T].energyKjHundred &&
                (c += parseFloat(e[T].energyKj) * k),
              "" != e[T].energyKcalHundred &&
                (u += parseFloat(e[T].energyKcal) * k),
              "" != e[T].fatHundred && (p += parseFloat(e[T].fat) * k),
              "" != e[T].saturatesHundred &&
                (f += parseFloat(e[T].saturates) * k),
              "" != e[T].carbohydratesHundred &&
                (h += parseFloat(e[T].carbohydrates) * k),
              "" != e[T].sugarsHundred && (m += parseFloat(e[T].sugars) * k),
              "" != e[T].fibreHundred && (v += parseFloat(e[T].fibre) * k),
              "" != e[T].proteinHundred && (g += parseFloat(e[T].protein) * k),
              "" != e[T].saltHundred && (y += parseFloat(e[T].salt) * k),
              "" != e[T].energyKj && (t += parseFloat(e[T].energyKj * S)),
              "" != e[T].energyKcal && (n += parseFloat(e[T].energyKcal * S)),
              "" != e[T].fat && (a += parseFloat(e[T].fat * S)),
              "" != e[T].saturates && (r += parseFloat(e[T].saturates * S)),
              "" != e[T].carbohydrates &&
                (o += parseFloat(e[T].carbohydrates * S)),
              "" != e[T].sugars && (i += parseFloat(e[T].sugars * S)),
              "" != e[T].fibre && (s += parseFloat(e[T].fibre * S)),
              "" != e[T].protein && (l += parseFloat(e[T].protein * S)),
              "" != e[T].salt && (d += parseFloat(e[T].salt * S)),
              null != e[T].allergens && (w = w.concat(e[T].allergens)),
              (b = 0 != parseInt(e[T].suitableForVegetarians)),
              0 == parseInt(e[T].suitableForVegans) ? (C = !1) : (b = !0),
              "" != $.trim(e[T].ingredients) &&
                "." != $.trim(e[T].ingredients) &&
                $("#optionIngredients_" + e[T].id).html(
                  e[T].shortDescription + ": " + e[T].ingredients
                );
          }
          var I = Math.round(c).toFixed(0);
          4 == I.length && (I = I.substring(0, 1) + "," + I.substring(1));
          var D = Math.round(u).toFixed(0);
          4 == D.length && (D = D.substring(0, 1) + "," + D.substring(1)),
            $("#energyKj").html(I),
            $("#energyKcal").html(D),
            $("#fat").html(toFixedClearDecimals(p)),
            $("#saturates").html(toFixedClearDecimals(f)),
            $("#carbohydrates").html(toFixedClearDecimals(h)),
            $("#sugars").html(toFixedClearDecimals(m)),
            $("#fibre").html(toFixedClearDecimals(v)),
            $("#protein").html(toFixedClearDecimals(g)),
            $("#salt").html(toFixedClearDecimals(y));
          var E = Math.round(t).toFixed(0);
          4 == E.length && (E = I.substring(0, 1) + "," + E.substring(1));
          var F = Math.round(n).toFixed(0);
          4 == F.length && (F = F.substring(0, 1) + "," + F.substring(1)),
            $("#energyKjServing").html(E),
            $("#energyKcalServing").html(F),
            $("#fatServing").html(toFixedClearDecimals(a)),
            $("#saturatesServing").html(toFixedClearDecimals(r)),
            $("#carbohydratesServing").html(toFixedClearDecimals(o)),
            $("#sugarsServing").html(toFixedClearDecimals(i)),
            $("#fibreServing").html(toFixedClearDecimals(s)),
            $("#proteinServing").html(toFixedClearDecimals(l)),
            $("#saltServing").html(toFixedClearDecimals(d));
          for (var M = "", T = 0; T < w.length; T++)
            T > 0 && (M += ", "), (M += w[T]);
          "" == M && (M = "This product has no allergens."),
            $("#allergenList").html(M);
          var A = "Suitable for vegetarians and vegans.";
          0 == b && 0 == C
            ? (A = "Not suitable for vegetarians or vegans.")
            : 0 == C &&
              (A = "Suitable for vegetarians. Not suitable for vegans."),
            $("#dietaryAdvice").html(A);
        }
      }
    ).fail(function (e) {
      console.log(e), $("#loaderContainer").addClass("hide");
    }));
}
function toFixedClearDecimals(e) {
  console.log(e);
  var t = e.toFixed(1);
  return t.endsWith(".0") ? t.substring(0, t.length - 2) : t;
}
function info_panel() {
  setTimeout(function () {
    pageHeight = $(".Page").outerHeight();
  }, 1e3),
    $(".js-open_infopanel").click(function (e) {
      e.preventDefault(),
        ignoreFood || $(".js-open_infopanel").removeClass("activeLink"),
        $(this).addClass("activeLink");
      var t = $(".InfoPanel").outerHeight(!0),
        n = $(".PageNav").offset().top;
      $("html:not(:animated),body:not(:animated)").animate(
        { scrollTop: n },
        1e3
      ),
        $(".Page").animate({ height: t }, function () {
          $(".InfoPanel").fadeIn(), $("#Carousel").fadeOut();
        }),
        (panelOpen = !0);
    }),
    $(document).on("click", ".js-close_infopanel", function () {
      $(".js-open_infopanel").removeClass("activeLink"),
        $(".InfoPanel").fadeOut(),
        $("#Carousel").fadeIn(),
        $(".Page").animate({ height: pageHeight }),
        (panelOpen = !1),
        pushStateActive && history.pushState({}, "", "/food");
    });
}
function PriceQuantity(e, t, n, a) {
  (this.price = e),
    (this.quantity = t),
    (this.minquantity = a),
    (this.name = n);
}
function order_calculator() {
  $("#decreaseQuant").click(function () {
    var e = parseInt($("#actualQuant").html()) - 1;
    e >= 1 && $("#actualQuant").html(e);
  }),
    $("#increaseQuant").click(function () {
      $("#actualQuant").html(parseInt($("#actualQuant").html()) + 1);
    }),
    $(".basket-decrease").click(function () {
      var e = parseInt(orders[$(this).attr("data-product-ref")].quantity);
      if (e > 1) {
        (orders[$(this).attr("data-product-ref")] = new PriceQuantity(
          $(this).attr("data-price-ref"),
          e - 1,
          $(this).attr("data-productname-ref"),
          $(this).attr("data-minquantity-ref")
        )),
          $("#quantityTotal_" + $(this).attr("data-product-ref")).html(e - 1);
        var t = (e - 1) * parseFloat($(this).attr("data-price-ref"));
        (t = t.toFixed(2).split(".")),
          (t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
          (t = t[0] + "." + t[1]),
          $("#mainTotalUpdate_" + $(this).attr("data-product-ref")).html(
            "" + t
          ),
          updateTotal(),
          submitToBasket();
      }
    }),
    $(".basket-increase").click(function () {
      var e = parseInt(orders[$(this).attr("data-product-ref")].quantity);
      (orders[$(this).attr("data-product-ref")] = new PriceQuantity(
        $(this).attr("data-price-ref"),
        e + 1,
        $(this).attr("data-productname-ref"),
        $(this).attr("data-minquantity-ref")
      )),
        $("#quantityTotal_" + $(this).attr("data-product-ref")).html(e + 1);
      var t = (e + 1) * parseFloat($(this).attr("data-price-ref"));
      (t = t.toFixed(2).split(".")),
        (t[0] = t[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
        (t = t[0] + "." + t[1]),
        $("#mainTotalUpdate_" + $(this).attr("data-product-ref")).html("" + t),
        updateTotal(),
        submitToBasket();
    }),
    $(".c-basket-remove").click(function () {
      (orders[$(this).attr("data-product-ref")] = new PriceQuantity(
        $(this).attr("data-price-ref"),
        0,
        $(this).attr("data-productname-ref"),
        $(this).attr("data-minquantity-ref")
      )),
        updateTotal(),
        $("#container-" + $(this).attr("data-product-ref")).hide();
      var e = 0;
      $.each(orders, function (t, n) {
        !isNaN(n.quantity) &&
          parseFloat(n.quantity) > 0 &&
          (e += parseFloat(n.quantity) * parseFloat(n.price));
      }),
        0 == e &&
          ($("#emptyBasket").removeClass("hiddenForm"),
          $("#activeBasket").addClass("hiddenForm")),
        submitToBasket();
    }),
    $("#addToBasketButton").click(function () {
      (orders[$(this).attr("data-product-ref")] = new PriceQuantity(
        $(this).attr("data-price-ref"),
        parseInt($("#actualQuant").html()),
        $(this).attr("data-productname-ref"),
        $(this).attr("data-minquantity-ref")
      )),
        updateTotal(),
        $("#addToBasketButton").html("Update Basket"),
        submitToBasket();
    }),
    $(".c-add-to-basket").click(function () {
      if (0 == $(this).hasClass("c-unavailable")) {
        if (parseInt($(this).data("total")) > 0)
          return void (window.location.href = "/basket");
        $(this).data("total", "1"),
          $(this).html("Go to basket"),
          (orders[$(this).attr("data-product-ref")] = new PriceQuantity(
            $(this).attr("data-price-ref"),
            1,
            $(this).attr("data-productname-ref"),
            $(this).attr("data-minquantity-ref")
          )),
          updateTotal(),
          submitToBasket();
      }
    }),
    $(".pr-basket, .pr-basket-hidden").each(function () {
      (orders[$(this).attr("data-product-ref")] = new PriceQuantity(
        $(this).attr("data-price-ref"),
        $(this).attr("data-total"),
        $(this).attr("data-productname-ref"),
        $(this).attr("data-minquantity-ref")
      )),
        console.log(orders);
    }),
    $(".c-add-to-basket").each(function () {
      0 == $(this).hasClass("c-unavailable") &&
        parseInt($(this).data("total")) > 0 &&
        (orders[$(this).attr("data-product-ref")] = new PriceQuantity(
          $(this).attr("data-price-ref"),
          $(this).attr("data-total"),
          $(this).attr("data-productname-ref"),
          $(this).attr("data-minquantity-ref")
        ));
    });
}
function getCashTotal() {
  var e = 0;
  if (
    ($.each(orders, function (t, n) {
      !isNaN(n.quantity) &&
        parseFloat(n.quantity) > 0 &&
        (e += parseFloat(n.quantity) * parseFloat(n.price));
    }),
    $("#existingTotal").length > 0)
  ) {
    var t = $("#existingTotal").val().replace(/,/g, "");
    0 == isNaN(t) && (e += parseFloat(t));
  }
  return e;
}
function updateTotal() {
  var e = getCashTotal().toFixed(2).split(".");
  (e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
    (e = e[0] + "." + e[1]),
    $("#buyModulePrice").html("" + e),
    $("#basketTotal").length > 0 && $("#basketTotal").html("" + e);
}
function setup_orderform() {
  $("#orderForm").submit(function () {
    return (
      $(".Product-quantity").each(function () {
        (orders[$(this).attr("data-product-ref")] = new PriceQuantity(
          $(this).attr("data-price-ref"),
          $(this).val(),
          $(this).attr("data-productname-ref"),
          $(this).attr("data-minquantity-ref")
        )),
          updateTotal();
      }),
      validateAndSubmitProducts()
    );
  }),
    $("#personaliseForm").submit(function () {
      return validateAndSubmitPersonalisations();
    }),
    $(".Product-quantity").keydown(function (e) {
      $.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
        (65 == e.keyCode && e.ctrlKey === !0) ||
        (e.keyCode >= 35 && e.keyCode <= 40) ||
        ((e.shiftKey || e.keyCode < 48 || e.keyCode > 57) &&
          (e.keyCode < 96 || e.keyCode > 105) &&
          e.preventDefault());
    });
}
function validateAndSubmitPersonalisations() {
  for (var e = $("#validationIdx").val(), t = !0, n = 1; n <= e; n++) {
    $(".validationIdx-" + n).addClass("hiddenForm");
    var a = !0,
      r = 1 == $("#grid_validationIdx_" + n).data("optmand");
    if (r)
      $("#grid_validationIdx_" + n)
        .find('input[type="text"]')
        .each(function () {
          "" == $(this).val()
            ? ($(this).prev().addClass("Incomplete"), (a = !1))
            : $(this).prev().removeClass("Incomplete");
        }),
        $("#grid_validationIdx_" + n)
          .find("select")
          .each(function () {
            "select" == $(this).find("option:selected").val()
              ? ($(this).parent().prev().addClass("Incomplete"), (a = !1))
              : $(this).parent().prev().removeClass("Incomplete");
          });
    else {
      var o = $("#grid_validationIdx_" + n).data("type");
      if ("standard" == o) {
        var i = !1;
        $("#grid_validationIdx_" + n)
          .find('input[type="text"]')
          .each(function () {
            "" != $(this).val() && (i = !0);
          }),
          i &&
            $("#grid_validationIdx_" + n)
              .find("select")
              .each(function () {
                "select" == $(this).find("option:selected").val()
                  ? ($(this)
                      .parent()
                      .prev()
                      .find(".midGrey")
                      .addClass("hiddenForm"),
                    $(this).parent().prev().addClass("Incomplete"),
                    (a = !1))
                  : ($(this)
                      .parent()
                      .prev()
                      .find(".midGrey")
                      .removeClass("hiddenForm"),
                    $(this).parent().prev().removeClass("Incomplete"));
              });
      } else if ("multiitem" == o) {
        var i = !1,
          s = !1;
        $("#grid_validationIdx_" + n)
          .find('input[type="text"]')
          .each(function () {
            "" != $(this).val() ? (i = !0) : (s = !0);
          }),
          i &&
            s &&
            ((a = !1),
            $("#grid_validationIdx_" + n)
              .find('input[type="text"]')
              .each(function () {
                "" == $(this).val()
                  ? $(this).prev().addClass("Incomplete")
                  : $(this).prev().removeClass("Incomplete");
              })),
          i &&
            $("#grid_validationIdx_" + n)
              .find("select")
              .each(function () {
                "select" == $(this).find("option:selected").val()
                  ? ($(this).parent().prev().addClass("Incomplete"), (a = !1))
                  : $(this).parent().prev().removeClass("Incomplete");
              });
      }
    }
    0 == a &&
      ($(".validationIdx-" + n).removeClass("hiddenForm"),
      t &&
        $("html, body").animate(
          {
            scrollTop:
              $(".validationIdx-" + n).offset().top -
              parseInt($(".Header").height()),
          },
          200
        ),
      (t = !1));
  }
  return t;
}
function submitToBasket() {
  var e = "";
  $.each(orders, function (t, n) {
    isNaN(n.quantity) || (e += t + ":" + n.quantity + ",");
  }),
    console.log(e),
    $("#addToBasketButton").prop("disabled", !0),
    $.post(
      "/submittobasket",
      { productQuantity: e, _token: $('[name="_csrftoken"]').val() },
      function (e) {
        $("#addToBasketButton").prop("disabled", !1);
      }
    ).fail(function () {
      $("#addToBasketButton").prop("disabled", !1);
    });
}
function validateAndSubmitProducts() {
  var e = "";
  $.each(orders, function (t, n) {
    !isNaN(n.quantity) && n.quantity > 0 && (e += t + ":" + n.quantity + ",");
  });
  var t = !1;
  if (
    ($("#promotionsVal").length &&
      "true" == $("#promotionsVal").val() &&
      (t = !0),
    0 == t &&
      ("" == e ||
        ("buffetproducts" == $("#productType").val() &&
          parseFloat(getCashTotal()) < 30)))
  )
    "" == e
      ? $("#productError").html(
          "Whoops! There are some errors or omissions in your details below. Please select a product."
        )
      : "buffetproducts" == $("#productType").val()
      ? $("#productError").html(
          "Whoops! There are some errors or omissions in your details below. There is a minimum order of 30.00 on buffets."
        )
      : "candcproducts" == $("#productType").val() &&
        $("#productError").html(
          "Whoops! There are some errors or omissions in your details below."
        ),
      $("#js-displayError").removeClass("hiddenForm"),
      $("html, body").animate(
        {
          scrollTop:
            $("#js-displayError").offset().top -
            parseInt($(".Header").height()),
        },
        200
      );
  else {
    if ("buffetproducts" != $("#productType").val())
      return $("#productQuantity").val(e), !0;
    var n = "";
    if (
      ($.each(orders, function (e, t) {
        !isNaN(t.quantity) &&
          parseInt(t.quantity) > 0 &&
          parseInt(t.quantity) < parseInt(t.minquantity) &&
          (n += t.name + " has a minimum order of " + t.minquantity + "<br />");
      }),
      "" == n)
    )
      return $("#productQuantity").val(e), !0;
    $("#productError").html(
      "Whoops! There are some errors or omissions in your details below. <br /><br />" +
        n
    ),
      $("#js-displayError").removeClass("hiddenForm"),
      $("html, body").animate(
        {
          scrollTop:
            $("#js-displayError").offset().top -
            parseInt($(".Header").height()),
        },
        200
      );
  }
  return !1;
}
function pageImages() {
  function e(e, t, n, a) {
    $("<img/>")
      .attr("src", t)
      .load(function () {
        $(e).addClass(a).addClass("js-loaded");
      });
  }
  var t = $(".pageImage");
  t.length &&
    t.each(function () {
      var t, n, a, r, o;
      (t = $(this).attr("id")),
        "homepage" === t
          ? ((n = Math.floor(6 * Math.random())),
            (a = "../images/bgs/homepage-background-new-0" + n + ".jpg"),
            (r = "../images/bgs/homepage-background-new-0" + n + "-mobile.jpg"),
            (o = "home-" + (n + 1)))
          : "careerspage" === t
          ? ((a = "../images/bgs/careerspage-background-new-00.jpg"),
            (r = "../images/bgs/careerspage-background-new-mobile-00.jpg"),
            (o = "careerspage-background"))
          : "contactpage" === t
          ? ((a = "../images/bgs/contactpage-background-new.jpg"),
            (r = "../images/bgs/contactpage-background-new-mobile.jpg"),
            (o = "contactpage-background"))
          : ((a = "../images/bgs/" + t + "-background.jpg"),
            (r = "../images/bgs/" + t + "-background-mobile.jpg"),
            (o = t + "-background")),
        e(this, a, r, o);
    });
}
function canvasHeight() {
  var e = $(window).height(),
    t = $(".Header").height();
  if (winWidth >= 768) var n = $(".PageNav-menu").outerHeight();
  else if ($(".PageNav-menu").length) var n = 60;
  else var n = 0;
  $(".Canvas").css({ height: e - t - n });
}
function animate(e, t, n) {
  e.transition(
    { height: t },
    $.support.transition ? "ease-in-out" : "swing",
    function () {
      (clamAnimating = !1), n();
    }
  );
}
function storyFade() {
  var e = $(window).scrollTop();
  $(".storyImage").each(function () {
    var t = $(this).offset().top - 181;
    t <= e && $(this).addClass("onShow");
  });
}
function pageNav() {
  var e = $(window).scrollTop(),
    t = $(".PageNav-menu").outerHeight();
  $(".PageNav").each(function () {
    $(".PageNav").height(t);
    var n = $(this).offset().top;
    winWidth >= 768 &&
      (n <= e
        ? $(".PageNav-menu").addClass("PageNav-stick")
        : $(".PageNav-menu").removeClass("PageNav-stick"));
  });
}
function Stick() {
  if ($("#orderForm").length)
    return $(document).scrollTop() >= orderBottom - winHeight, !1;
}
function bannerHack() {
  if ($("#siteBanner").is(":visible")) {
    var e = document.querySelector("#siteBanner").clientHeight;
    e > 0 &&
      (window.scrollY <= e
        ? ($("body").hasClass("touch") ||
            $(".Site .Canvas").css("background-position-y", e - window.scrollY),
          window.innerWidth <= 1023
            ? $(".basketBuyModule-container").css("top", -window.scrollY + "px")
            : $(".basketBuyModule-container").css(
                "top",
                e - window.scrollY + "px"
              ))
        : ($("body").hasClass("touch") ||
            $(".Site .Canvas").css("background-position-y", 0),
          window.innerWidth <= 1023
            ? $(".basketBuyModule-container").css("top", "-" + e + "px")
            : $(".basketBuyModule-container").css("top", "0px")));
  }
}
function processVoucher(e) {
  for (
    var t = $("#voucherId_" + e).val(), n = 0;
    n < redeemedVouchers.length;
    n++
  )
    if (redeemedVouchers[n].id == e) {
      redeemedVouchers.splice(n, 1);
      break;
    }
  if ("undefined" != typeof t && t.length > 4) {
    for (var a = !1, n = 0; n < redeemedVouchers.length; n++)
      if (redeemedVouchers[n].name == t && redeemedVouchers[n].id != e) {
        a = !0;
        break;
      }
    a
      ? formatVoucherTotals()
      : $.post("/getapplicablevoucher", {
          referenceId: $("#voucherId_" + e).val(),
          orderType: $("#orderType").val(),
        })
          .done(function (t) {
            if (
              ($("#discountSubmit").html("Make payment"), "INVALID" == t.name)
            )
              $("#voucherValidation_" + e).removeClass("correct"),
                $("#voucherValidation_" + e).addClass("incorrect"),
                formatVoucherTotals();
            else if ("undefined" != typeof t.name)
              if (a)
                $("#voucherValidation_" + e).removeClass("correct"),
                  $("#voucherValidation_" + e).addClass("incorrect");
              else {
                $("#voucherValidation_" + e).removeClass("incorrect"),
                  $("#voucherValidation_" + e).addClass("correct");
                var n = {
                  id: e,
                  name: t.name,
                  discountCashValue: t.discountCashValue,
                  discountPercentage: t.discountPercentage,
                  deliveryDiscount: t.deliveryDiscount,
                  voucherType: t.voucherType,
                  uniqueReference: t.uniqueReference,
                };
                redeemedVouchers.push(n),
                  formatVoucherTotals(),
                  console.log("COUNT FORMAT: " + redeemedVouchers.length);
              }
            checkShowAddVoucher();
          })
          .fail(function () {
            $("#voucherValidation_" + e).removeClass("correct"),
              $("#voucherValidation_" + e).addClass("incorrect"),
              formatVoucherTotals();
          });
  } else
    $("#voucherValidation_" + e).removeClass("correct"),
      $("#voucherValidation_" + e).removeClass("incorrect"),
      formatVoucherTotals();
}
function checkShowAddVoucher() {
  var e = !0;
  $(".voucherField").each(function () {
    $(this).hasClass("correct") || (e = !1);
  }),
    e
      ? $("#addAnotherVoucher").addClass("visible")
      : $("#addAnotherVoucher").removeClass("visible");
}
function formatVoucherTotals() {
  for (var e = new Array(), t = 0; t < redeemedVouchers.length; t++)
    console.log(redeemedVouchers[t]),
      (e[t] = redeemedVouchers[t].uniqueReference);
  if (e.length > 0)
    $.post("/applyvouchers", { voucherCode: e }).done(function (e) {
      if (
        (console.log(e),
        $(
          "#discountField, #discountAmount, #deliveryDiscountField, #deliveryDiscountAmount"
        ).hide(),
        e.discount > 0)
      ) {
        $("#discountField, #discountAmount").show(),
          $("#discountAmount").html("— " + formatCashTotal(e.discount)),
          a - e.discount <= 0
            ? $("#newSubTotal, #buyModulePrice").html("0.00")
            : $("#newSubTotal, #buyModulePrice").html(
                "" + formatCashTotal(e.discountedSubtotal)
              );
        var t = $("#orderType").val();
        "buffetproducts" == t &&
          $("#newVatTotal").html(
            "" + formatCashTotal(0.2 * e.discountedSubtotal)
          );
      }
      e.deliveryDiscount > 0 &&
        (e.deliveryDiscount > parseFloat(deliveryCharge) &&
          (e.deliveryDiscount = e.deliveryCharge),
        $("#deliveryDiscountField, #deliveryDiscountAmount").show(),
        $("#deliveryDiscountAmount").html(
          "— " + formatCashTotal(e.deliveryDiscount)
        )),
        e.chargeableTotal <= 0
          ? ($("#newTotal").html("0.00"),
            $("#discountSubmit").html("Place order"))
          : ($("#newTotal").html("" + formatCashTotal(e.chargeableTotal)),
            $("#discountSubmit").html("Make payment"));
    });
  else {
    $(
      "#discountField, #discountAmount, #deliveryDiscountField, #deliveryDiscountAmount"
    ).hide();
    var n = $("#orderSubTotal").val(),
      a = $("#orderTotal").val();
    $("#newSubTotal, #buyModulePrice").html("" + formatCashTotal(n)),
      $("#newTotal").html("" + formatCashTotal(a));
    var r = $("#orderType").val();
    if ("buffetproducts" == r) {
      var o = $("#vatTotal").val();
      $("#newVatTotal").html("" + formatCashTotal(o));
    }
  }
}
function formatCashTotal(e) {
  return (
    (e = parseFloat(e).toFixed(2).split(".")),
    (e[0] = e[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")),
    (e = e[0] + "." + e[1])
  );
}
function vouchers() {
  $(
    "#discountField, #deliveryDiscountField, #discountAmount, #deliveryDiscountAmount"
  ).hide(),
    setVoucherListeners(),
    $("#addAnotherVoucher").click(function () {
      var e =
        '<div id="voucherValidation_' +
        nextVoucherId +
        '" data-id="' +
        nextVoucherId +
        '" class="voucherField centerBlock smallestMarginTop"><input id="voucherId_' +
        nextVoucherId +
        '" class="voucherCode" data-id="' +
        nextVoucherId +
        '" type="text" name="voucherCode[]" /></div>';
      $("#addAnotherVoucher").before(e), nextVoucherId++, setVoucherListeners();
    });
}
function setVoucherListeners() {
  $(".voucherCode").each(function () {
    "" != $(this).val() && processVoucher($(this).data("id")),
      $(this).off("input"),
      $(this).on("input", function () {
        processVoucher($(this).data("id"));
      });
  });
}
function careersPage() {
  $("#addressLookup").length > 0 &&
    new clickToAddress({
      accessToken: "7ba62-0f490-be40b-0894a",
      dom: { search: "addressLookup" },
      defaultCountry: "gbr",
      countrySelector: !1,
      texts: { default_placeholder: "Type address of postcode" },
      enabledCountries: ["gbr"],
      onResultSelected: function (e, t, n) {
        (addressLookedUp = !0),
          $("#addressLookup").prev().removeClass("Incomplete"),
          $("#addressLookup").prev().addClass("hiddenForm"),
          $("#address-one").prev().removeClass("Incomplete"),
          $("#address-one").prev().addClass("hiddenForm"),
          $("#city").prev().removeClass("IncompleteUnderB"),
          $("#postcode").prev().removeClass("IncompleteUnderB"),
          $("#cityTownIncUnder").hide(),
          $("#postCodeIncUnder").hide(),
          $("#address-one").val(n.line_1),
          $("#address-two").val(n.line_2),
          $("#county").val(n.province_name),
          $("#city").val(n.locality),
          $("#postcode").val(n.postal_code),
          $("#country").val(n.country_name),
          $("li.address-hidden").removeClass("address-hidden");
      },
      domMode: "name",
    });
}
function showError() {
  animated ||
    ((animated = !0),
    $("#js-displayError").removeClass("hiddenForm"),
    $("html, body").animate(
      {
        scrollTop:
          $("#js-displayError").offset().top - parseInt($(".Header").height()),
      },
      200
    ));
}
function findAddress(e) {
  if (
    validate($("#" + e + "postcode")) &&
    validatePostCode($("#" + e + "postcode"))
  ) {
    $("#" + e + "addressLookupSpin").show(),
      $("#" + e + "addressLookupSection").hide();
    var t = !1,
      n = !1,
      a = $("#houseNumberOrName").val();
    a && a.length > 0 && (t = !0),
      $("#" + e + "houseNumberOrName")
        .prev()
        .removeClass("Incomplete"),
      $("#" + e + "houseNumberOrName")
        .prev()
        .addClass("hiddenForm"),
      $("#" + e + "address-two").val(""),
      $("#" + e + "county").val(""),
      $("#" + e + "city").val(""),
      $.post(
        "/findaddressbypostcode/" +
          $("#" + e + "postcode")
            .val()
            .replace(/ /g, ""),
        function (r) {
          var o = r.addressData;
          if (o) {
            $("#" + e + "addressLineSelect").html(
              '<option value="">Please select...</option>'
            );
            var i = o.premiseData;
            if (
              ($.each(i, function (r, o) {
                var i = o.addressString;
                t
                  ? i.toUpperCase().indexOf(a.toUpperCase()) > -1 &&
                    ((n = !0),
                    $("#" + e + "addressLineSelect").append(
                      $("<option></option>")
                        .attr("value", o.addressString)
                        .text(o.addressString)
                    ))
                  : $("#" + e + "addressLineSelect").append(
                      $("<option></option>")
                        .attr("value", o.addressString)
                        .text(o.addressString)
                    );
              }),
              o.address2 &&
                "" != o.address2 &&
                $("#" + e + "address-two").val(o.address2[0]),
              o.county &&
                "" != o.county &&
                $("#" + e + "county").val(o.county[0]),
              o.town && "" != o.town && $("#" + e + "city").val(o.town[0]),
              o.postcode &&
                "" != o.postcode &&
                $("#" + e + "postcode").val(o.postcode[0]),
              t && 0 == n)
            ) {
              var s = $("#" + e + "houseNumberOrName");
              s.prev().removeClass("hiddenForm"),
                s.prev().addClass("Incomplete");
            } else $("#" + e + "selectAddressInput").removeClass("hiddenForm");
          } else {
            var s = $("#postcode");
            s.prev().removeClass("hiddenForm"),
              s.prev().addClass("Incomplete"),
              s.prev().html("address data not found!"),
              animated ||
                ((animated = !0),
                $("#js-displayError").removeClass("hiddenForm"),
                $("html, body").animate(
                  {
                    scrollTop:
                      $("#js-displayError").offset().top -
                      parseInt($(".Header").height()),
                  },
                  200
                )),
              showEnterManually(e);
          }
          $("#" + e + "addressLookupSpin").hide(),
            $("#" + e + "addressLookupSection").show();
        }
      ).fail(function (t) {
        console.log(t);
        var n = $("#" + e + "postcode");
        n.prev().removeClass("hiddenForm"),
          n.prev().addClass("Incomplete"),
          n.prev().html("address data not available!"),
          animated ||
            ((animated = !0),
            $("#js-displayError").removeClass("hiddenForm"),
            $("html, body").animate(
              {
                scrollTop:
                  $("#js-displayError").offset().top -
                  parseInt($(".Header").height()),
              },
              200
            )),
          showEnterManually(e),
          $("#" + e + "addressLookupSpin").hide(),
          $("#" + e + "addressLookupSection").show();
      });
  }
}
function showEnterManually(e) {
  "" == e
    ? (addressLookedUp = !0)
    : "alt-" == e && (billingAddressLookedUp = !0),
    $("#" + e + "findAddress").hide(),
    $("#" + e + "enterManually").hide(),
    "" == e
      ? $("#addressDelivery li.hiddenForm").removeClass("hiddenForm")
      : $("#differentDelivery li.hiddenForm").removeClass("hiddenForm"),
    $("#" + e + "selectAddressInput").addClass("hiddenForm"),
    $("#" + e + "houseNumberOrNameLi").addClass("hiddenForm"),
    $("#continueButton").removeClass("hiddenForm");
}
function validate(e) {
  var t = "undefined" !== e.val() && $.trim(e.val()).length > 0;
  return (
    t
      ? (e.prev().removeClass("Incomplete"), e.prev().addClass("hiddenForm"))
      : (e.prev().removeClass("hiddenForm"),
        e.prev().addClass("Incomplete"),
        showError()),
    t
  );
}
function validateUnder(e, t) {
  var n = "undefined" !== e.val() && $.trim(e.val()).length > 0;
  return (
    n
      ? ($(t).hide(), e.prev().removeClass("IncompleteUnderB"))
      : ($(t).show(), e.prev().addClass("IncompleteUnderB"), showError()),
    n
  );
}
function validateUnderPostcode(e, t) {
  var n =
    "undefined" !== e.val() &&
    $.trim(e.val()).length > 0 &&
    isValidPostcode(e.val());
  return n ? $(t).hide() : ($(t).show(), showError()), n;
}
function validatePostCode(e) {
  var t = e.val(),
    n = isValidPostcode(t);
  return (
    n
      ? (e.prev().removeClass("Incomplete"),
        e.prev().addClass("hiddenForm"),
        e.prev().html("must be completed!"))
      : (e.prev().removeClass("hiddenForm"),
        e.prev().addClass("Incomplete"),
        e.prev().html("enter a valid postcode!"),
        animated ||
          ((animated = !0),
          $("#js-displayError").removeClass("hiddenForm"),
          $("html, body").animate(
            {
              scrollTop:
                $("#js-displayError").offset().top -
                parseInt($(".Header").height()),
            },
            200
          ))),
    n
  );
}
function isValidPostcode(e) {
  var t = "[abcdefghijklmnoprstuwyz]",
    n = "[abcdefghklmnopqrstuvwxy]",
    a = "[abcdefghjkpmnrstuvwxy]",
    r = "[abehmnprvwxy]",
    o = "[abdefghjlnpqrstuwxyz]",
    i = "[abdefghjlnpqrst]",
    s = "[abdefghjlnpqrstuwzyz]",
    l = new Array();
  l.push(new RegExp("^(bf1)(\\s*)([0-6]{1}" + i + "{1}" + s + "{1})$", "i")),
    l.push(
      new RegExp(
        "^(" + t + "{1}" + n + "?[0-9]{1,2})(\\s*)([0-9]{1}" + o + "{2})$",
        "i"
      )
    ),
    l.push(
      new RegExp(
        "^(" + t + "{1}[0-9]{1}" + a + "{1})(\\s*)([0-9]{1}" + o + "{2})$",
        "i"
      )
    ),
    l.push(
      new RegExp(
        "^(" +
          t +
          "{1}" +
          n +
          "{1}?[0-9]{1}" +
          r +
          "{1})(\\s*)([0-9]{1}" +
          o +
          "{2})$",
        "i"
      )
    ),
    l.push(/^(GIR)(\s*)(0AA)$/i),
    l.push(/^(bfpo)(\s*)([0-9]{1,4})$/i),
    l.push(/^(bfpo)(\s*)(c\/o\s*[0-9]{1,3})$/i),
    l.push(/^([A-Z]{4})(\s*)(1ZZ)$/i),
    l.push(/^(ai-2640)$/i);
  for (var d = e, c = !1, u = 0; u < l.length; u++)
    if (l[u].test(d)) {
      l[u].exec(d),
        (d = RegExp.$1.toUpperCase() + " " + RegExp.$3.toUpperCase()),
        (d = d.replace(/C\/O\s*/, "c/o ")),
        "AI-2640" == e.toUpperCase() && (d = "AI-2640"),
        (c = !0);
      break;
    }
  return c;
}
function showError(e) {
  $("#js-displayError").removeClass("hiddenForm"),
    $("#cardErrorMessage").html(e),
    $("#submitPayment").show(),
    $(".spinner").hide();
}
function logServer(e) {
  $.ajax({
    url: "/stripelogging",
    type: "POST",
    data: { message: e },
    success: function (e) {},
    error: function (e, t, n) {
      console.log(n);
    },
  });
}
function confirmOrder() {
  $("#paymentForm").submit();
}
function toggleError(e, t, n) {
  document.getElementById("card-errors");
  t
    ? ($(e).html(n.replace(".", "")),
      $(e).removeClass("hiddenForm"),
      $(e).addClass("Incomplete"),
      $(e).show())
    : ($(e).html(""),
      $(e).addClass("hiddenForm"),
      $(e).removeClass("Incomplete"),
      $(e).hide());
}
!(function (e, t) {
  "object" == typeof module && "object" == typeof module.exports
    ? (module.exports = e.document
        ? t(e, !0)
        : function (e) {
            if (!e.document)
              throw new Error("jQuery requires a window with a document");
            return t(e);
          })
    : t(e);
})("undefined" != typeof window ? window : this, function (e, t) {
  function n(e) {
    var t = e.length,
      n = re.type(e);
    return (
      "function" !== n &&
      !re.isWindow(e) &&
      (!(1 !== e.nodeType || !t) ||
        "array" === n ||
        0 === t ||
        ("number" == typeof t && t > 0 && t - 1 in e))
    );
  }
  function a(e, t, n) {
    if (re.isFunction(t))
      return re.grep(e, function (e, a) {
        return !!t.call(e, a, e) !== n;
      });
    if (t.nodeType)
      return re.grep(e, function (e) {
        return (e === t) !== n;
      });
    if ("string" == typeof t) {
      if (pe.test(t)) return re.filter(t, e, n);
      t = re.filter(t, e);
    }
    return re.grep(e, function (e) {
      return re.inArray(e, t) >= 0 !== n;
    });
  }
  function r(e, t) {
    do e = e[t];
    while (e && 1 !== e.nodeType);
    return e;
  }
  function o(e) {
    var t = (be[e] = {});
    return (
      re.each(e.match($e) || [], function (e, n) {
        t[n] = !0;
      }),
      t
    );
  }
  function i() {
    he.addEventListener
      ? (he.removeEventListener("DOMContentLoaded", s, !1),
        e.removeEventListener("load", s, !1))
      : (he.detachEvent("onreadystatechange", s), e.detachEvent("onload", s));
  }
  function s() {
    (he.addEventListener ||
      "load" === event.type ||
      "complete" === he.readyState) &&
      (i(), re.ready());
  }
  function l(e, t, n) {
    if (void 0 === n && 1 === e.nodeType) {
      var a = "data-" + t.replace(ke, "-$1").toLowerCase();
      if (((n = e.getAttribute(a)), "string" == typeof n)) {
        try {
          n =
            "true" === n ||
            ("false" !== n &&
              ("null" === n
                ? null
                : +n + "" === n
                ? +n
                : Te.test(n)
                ? re.parseJSON(n)
                : n));
        } catch (r) {}
        re.data(e, t, n);
      } else n = void 0;
    }
    return n;
  }
  function d(e) {
    var t;
    for (t in e)
      if (("data" !== t || !re.isEmptyObject(e[t])) && "toJSON" !== t)
        return !1;
    return !0;
  }
  function c(e, t, n, a) {
    if (re.acceptData(e)) {
      var r,
        o,
        i = re.expando,
        s = e.nodeType,
        l = s ? re.cache : e,
        d = s ? e[i] : e[i] && i;
      if (
        (d && l[d] && (a || l[d].data)) ||
        void 0 !== n ||
        "string" != typeof t
      )
        return (
          d || (d = s ? (e[i] = X.pop() || re.guid++) : i),
          l[d] || (l[d] = s ? {} : { toJSON: re.noop }),
          ("object" == typeof t || "function" == typeof t) &&
            (a
              ? (l[d] = re.extend(l[d], t))
              : (l[d].data = re.extend(l[d].data, t))),
          (o = l[d]),
          a || (o.data || (o.data = {}), (o = o.data)),
          void 0 !== n && (o[re.camelCase(t)] = n),
          "string" == typeof t
            ? ((r = o[t]), null == r && (r = o[re.camelCase(t)]))
            : (r = o),
          r
        );
    }
  }
  function u(e, t, n) {
    if (re.acceptData(e)) {
      var a,
        r,
        o = e.nodeType,
        i = o ? re.cache : e,
        s = o ? e[re.expando] : re.expando;
      if (i[s]) {
        if (t && (a = n ? i[s] : i[s].data)) {
          re.isArray(t)
            ? (t = t.concat(re.map(t, re.camelCase)))
            : t in a
            ? (t = [t])
            : ((t = re.camelCase(t)), (t = t in a ? [t] : t.split(" "))),
            (r = t.length);
          for (; r--; ) delete a[t[r]];
          if (n ? !d(a) : !re.isEmptyObject(a)) return;
        }
        (n || (delete i[s].data, d(i[s]))) &&
          (o
            ? re.cleanData([e], !0)
            : ne.deleteExpando || i != i.window
            ? delete i[s]
            : (i[s] = null));
      }
    }
  }
  function p() {
    return !0;
  }
  function f() {
    return !1;
  }
  function h() {
    try {
      return he.activeElement;
    } catch (e) {}
  }
  function m(e) {
    var t = je.split("|"),
      n = e.createDocumentFragment();
    if (n.createElement) for (; t.length; ) n.createElement(t.pop());
    return n;
  }
  function v(e, t) {
    var n,
      a,
      r = 0,
      o =
        typeof e.getElementsByTagName !== xe
          ? e.getElementsByTagName(t || "*")
          : typeof e.querySelectorAll !== xe
          ? e.querySelectorAll(t || "*")
          : void 0;
    if (!o)
      for (o = [], n = e.childNodes || e; null != (a = n[r]); r++)
        !t || re.nodeName(a, t) ? o.push(a) : re.merge(o, v(a, t));
    return void 0 === t || (t && re.nodeName(e, t)) ? re.merge([e], o) : o;
  }
  function g(e) {
    Fe.test(e.type) && (e.defaultChecked = e.checked);
  }
  function y(e, t) {
    return re.nodeName(e, "table") &&
      re.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr")
      ? e.getElementsByTagName("tbody")[0] ||
          e.appendChild(e.ownerDocument.createElement("tbody"))
      : e;
  }
  function $(e) {
    return (e.type = (null !== re.find.attr(e, "type")) + "/" + e.type), e;
  }
  function b(e) {
    var t = Ue.exec(e.type);
    return t ? (e.type = t[1]) : e.removeAttribute("type"), e;
  }
  function C(e, t) {
    for (var n, a = 0; null != (n = e[a]); a++)
      re._data(n, "globalEval", !t || re._data(t[a], "globalEval"));
  }
  function w(e, t) {
    if (1 === t.nodeType && re.hasData(e)) {
      var n,
        a,
        r,
        o = re._data(e),
        i = re._data(t, o),
        s = o.events;
      if (s) {
        delete i.handle, (i.events = {});
        for (n in s)
          for (a = 0, r = s[n].length; r > a; a++) re.event.add(t, n, s[n][a]);
      }
      i.data && (i.data = re.extend({}, i.data));
    }
  }
  function x(e, t) {
    var n, a, r;
    if (1 === t.nodeType) {
      if (((n = t.nodeName.toLowerCase()), !ne.noCloneEvent && t[re.expando])) {
        r = re._data(t);
        for (a in r.events) re.removeEvent(t, a, r.handle);
        t.removeAttribute(re.expando);
      }
      "script" === n && t.text !== e.text
        ? (($(t).text = e.text), b(t))
        : "object" === n
        ? (t.parentNode && (t.outerHTML = e.outerHTML),
          ne.html5Clone &&
            e.innerHTML &&
            !re.trim(t.innerHTML) &&
            (t.innerHTML = e.innerHTML))
        : "input" === n && Fe.test(e.type)
        ? ((t.defaultChecked = t.checked = e.checked),
          t.value !== e.value && (t.value = e.value))
        : "option" === n
        ? (t.defaultSelected = t.selected = e.defaultSelected)
        : ("input" === n || "textarea" === n) &&
          (t.defaultValue = e.defaultValue);
    }
  }
  function T(t, n) {
    var a,
      r = re(n.createElement(t)).appendTo(n.body),
      o =
        e.getDefaultComputedStyle && (a = e.getDefaultComputedStyle(r[0]))
          ? a.display
          : re.css(r[0], "display");
    return r.detach(), o;
  }
  function k(e) {
    var t = he,
      n = Ze[e];
    return (
      n ||
        ((n = T(e, t)),
        ("none" !== n && n) ||
          ((Ge = (
            Ge || re("<iframe frameborder='0' width='0' height='0'/>")
          ).appendTo(t.documentElement)),
          (t = (Ge[0].contentWindow || Ge[0].contentDocument).document),
          t.write(),
          t.close(),
          (n = T(e, t)),
          Ge.detach()),
        (Ze[e] = n)),
      n
    );
  }
  function S(e, t) {
    return {
      get: function () {
        var n = e();
        if (null != n)
          return n
            ? void delete this.get
            : (this.get = t).apply(this, arguments);
      },
    };
  }
  function I(e, t) {
    if (t in e) return t;
    for (
      var n = t.charAt(0).toUpperCase() + t.slice(1), a = t, r = pt.length;
      r--;

    )
      if (((t = pt[r] + n), t in e)) return t;
    return a;
  }
  function D(e, t) {
    for (var n, a, r, o = [], i = 0, s = e.length; s > i; i++)
      (a = e[i]),
        a.style &&
          ((o[i] = re._data(a, "olddisplay")),
          (n = a.style.display),
          t
            ? (o[i] || "none" !== n || (a.style.display = ""),
              "" === a.style.display &&
                De(a) &&
                (o[i] = re._data(a, "olddisplay", k(a.nodeName))))
            : ((r = De(a)),
              ((n && "none" !== n) || !r) &&
                re._data(a, "olddisplay", r ? n : re.css(a, "display"))));
    for (i = 0; s > i; i++)
      (a = e[i]),
        a.style &&
          ((t && "none" !== a.style.display && "" !== a.style.display) ||
            (a.style.display = t ? o[i] || "" : "none"));
    return e;
  }
  function E(e, t, n) {
    var a = lt.exec(t);
    return a ? Math.max(0, a[1] - (n || 0)) + (a[2] || "px") : t;
  }
  function F(e, t, n, a, r) {
    for (
      var o = n === (a ? "border" : "content") ? 4 : "width" === t ? 1 : 0,
        i = 0;
      4 > o;
      o += 2
    )
      "margin" === n && (i += re.css(e, n + Ie[o], !0, r)),
        a
          ? ("content" === n && (i -= re.css(e, "padding" + Ie[o], !0, r)),
            "margin" !== n &&
              (i -= re.css(e, "border" + Ie[o] + "Width", !0, r)))
          : ((i += re.css(e, "padding" + Ie[o], !0, r)),
            "padding" !== n &&
              (i += re.css(e, "border" + Ie[o] + "Width", !0, r)));
    return i;
  }
  function M(e, t, n) {
    var a = !0,
      r = "width" === t ? e.offsetWidth : e.offsetHeight,
      o = et(e),
      i = ne.boxSizing && "border-box" === re.css(e, "boxSizing", !1, o);
    if (0 >= r || null == r) {
      if (
        ((r = tt(e, t, o)),
        (0 > r || null == r) && (r = e.style[t]),
        at.test(r))
      )
        return r;
      (a = i && (ne.boxSizingReliable() || r === e.style[t])),
        (r = parseFloat(r) || 0);
    }
    return r + F(e, t, n || (i ? "border" : "content"), a, o) + "px";
  }
  function A(e, t, n, a, r) {
    return new A.prototype.init(e, t, n, a, r);
  }
  function N() {
    return (
      setTimeout(function () {
        ft = void 0;
      }),
      (ft = re.now())
    );
  }
  function P(e, t) {
    var n,
      a = { height: e },
      r = 0;
    for (t = t ? 1 : 0; 4 > r; r += 2 - t)
      (n = Ie[r]), (a["margin" + n] = a["padding" + n] = e);
    return t && (a.opacity = a.width = e), a;
  }
  function _(e, t, n) {
    for (
      var a, r = ($t[t] || []).concat($t["*"]), o = 0, i = r.length;
      i > o;
      o++
    )
      if ((a = r[o].call(n, t, e))) return a;
  }
  function j(e, t, n) {
    var a,
      r,
      o,
      i,
      s,
      l,
      d,
      c,
      u = this,
      p = {},
      f = e.style,
      h = e.nodeType && De(e),
      m = re._data(e, "fxshow");
    n.queue ||
      ((s = re._queueHooks(e, "fx")),
      null == s.unqueued &&
        ((s.unqueued = 0),
        (l = s.empty.fire),
        (s.empty.fire = function () {
          s.unqueued || l();
        })),
      s.unqueued++,
      u.always(function () {
        u.always(function () {
          s.unqueued--, re.queue(e, "fx").length || s.empty.fire();
        });
      })),
      1 === e.nodeType &&
        ("height" in t || "width" in t) &&
        ((n.overflow = [f.overflow, f.overflowX, f.overflowY]),
        (d = re.css(e, "display")),
        (c = "none" === d ? re._data(e, "olddisplay") || k(e.nodeName) : d),
        "inline" === c &&
          "none" === re.css(e, "float") &&
          (ne.inlineBlockNeedsLayout && "inline" !== k(e.nodeName)
            ? (f.zoom = 1)
            : (f.display = "inline-block"))),
      n.overflow &&
        ((f.overflow = "hidden"),
        ne.shrinkWrapBlocks() ||
          u.always(function () {
            (f.overflow = n.overflow[0]),
              (f.overflowX = n.overflow[1]),
              (f.overflowY = n.overflow[2]);
          }));
    for (a in t)
      if (((r = t[a]), mt.exec(r))) {
        if (
          (delete t[a], (o = o || "toggle" === r), r === (h ? "hide" : "show"))
        ) {
          if ("show" !== r || !m || void 0 === m[a]) continue;
          h = !0;
        }
        p[a] = (m && m[a]) || re.style(e, a);
      } else d = void 0;
    if (re.isEmptyObject(p))
      "inline" === ("none" === d ? k(e.nodeName) : d) && (f.display = d);
    else {
      m ? "hidden" in m && (h = m.hidden) : (m = re._data(e, "fxshow", {})),
        o && (m.hidden = !h),
        h
          ? re(e).show()
          : u.done(function () {
              re(e).hide();
            }),
        u.done(function () {
          var t;
          re._removeData(e, "fxshow");
          for (t in p) re.style(e, t, p[t]);
        });
      for (a in p)
        (i = _(h ? m[a] : 0, a, u)),
          a in m ||
            ((m[a] = i.start),
            h &&
              ((i.end = i.start),
              (i.start = "width" === a || "height" === a ? 1 : 0)));
    }
  }
  function L(e, t) {
    var n, a, r, o, i;
    for (n in e)
      if (
        ((a = re.camelCase(n)),
        (r = t[a]),
        (o = e[n]),
        re.isArray(o) && ((r = o[1]), (o = e[n] = o[0])),
        n !== a && ((e[a] = o), delete e[n]),
        (i = re.cssHooks[a]),
        i && "expand" in i)
      ) {
        (o = i.expand(o)), delete e[a];
        for (n in o) n in e || ((e[n] = o[n]), (t[n] = r));
      } else t[a] = r;
  }
  function O(e, t, n) {
    var a,
      r,
      o = 0,
      i = yt.length,
      s = re.Deferred().always(function () {
        delete l.elem;
      }),
      l = function () {
        if (r) return !1;
        for (
          var t = ft || N(),
            n = Math.max(0, d.startTime + d.duration - t),
            a = n / d.duration || 0,
            o = 1 - a,
            i = 0,
            l = d.tweens.length;
          l > i;
          i++
        )
          d.tweens[i].run(o);
        return (
          s.notifyWith(e, [d, o, n]),
          1 > o && l ? n : (s.resolveWith(e, [d]), !1)
        );
      },
      d = s.promise({
        elem: e,
        props: re.extend({}, t),
        opts: re.extend(!0, { specialEasing: {} }, n),
        originalProperties: t,
        originalOptions: n,
        startTime: ft || N(),
        duration: n.duration,
        tweens: [],
        createTween: function (t, n) {
          var a = re.Tween(
            e,
            d.opts,
            t,
            n,
            d.opts.specialEasing[t] || d.opts.easing
          );
          return d.tweens.push(a), a;
        },
        stop: function (t) {
          var n = 0,
            a = t ? d.tweens.length : 0;
          if (r) return this;
          for (r = !0; a > n; n++) d.tweens[n].run(1);
          return t ? s.resolveWith(e, [d, t]) : s.rejectWith(e, [d, t]), this;
        },
      }),
      c = d.props;
    for (L(c, d.opts.specialEasing); i > o; o++)
      if ((a = yt[o].call(d, e, c, d.opts))) return a;
    return (
      re.map(c, _, d),
      re.isFunction(d.opts.start) && d.opts.start.call(e, d),
      re.fx.timer(re.extend(l, { elem: e, anim: d, queue: d.opts.queue })),
      d
        .progress(d.opts.progress)
        .done(d.opts.done, d.opts.complete)
        .fail(d.opts.fail)
        .always(d.opts.always)
    );
  }
  function H(e) {
    return function (t, n) {
      "string" != typeof t && ((n = t), (t = "*"));
      var a,
        r = 0,
        o = t.toLowerCase().match($e) || [];
      if (re.isFunction(n))
        for (; (a = o[r++]); )
          "+" === a.charAt(0)
            ? ((a = a.slice(1) || "*"), (e[a] = e[a] || []).unshift(n))
            : (e[a] = e[a] || []).push(n);
    };
  }
  function B(e, t, n, a) {
    function r(s) {
      var l;
      return (
        (o[s] = !0),
        re.each(e[s] || [], function (e, s) {
          var d = s(t, n, a);
          return "string" != typeof d || i || o[d]
            ? i
              ? !(l = d)
              : void 0
            : (t.dataTypes.unshift(d), r(d), !1);
        }),
        l
      );
    }
    var o = {},
      i = e === Wt;
    return r(t.dataTypes[0]) || (!o["*"] && r("*"));
  }
  function R(e, t) {
    var n,
      a,
      r = re.ajaxSettings.flatOptions || {};
    for (a in t) void 0 !== t[a] && ((r[a] ? e : n || (n = {}))[a] = t[a]);
    return n && re.extend(!0, e, n), e;
  }
  function q(e, t, n) {
    for (var a, r, o, i, s = e.contents, l = e.dataTypes; "*" === l[0]; )
      l.shift(),
        void 0 === r && (r = e.mimeType || t.getResponseHeader("Content-Type"));
    if (r)
      for (i in s)
        if (s[i] && s[i].test(r)) {
          l.unshift(i);
          break;
        }
    if (l[0] in n) o = l[0];
    else {
      for (i in n) {
        if (!l[0] || e.converters[i + " " + l[0]]) {
          o = i;
          break;
        }
        a || (a = i);
      }
      o = o || a;
    }
    return o ? (o !== l[0] && l.unshift(o), n[o]) : void 0;
  }
  function W(e, t, n, a) {
    var r,
      o,
      i,
      s,
      l,
      d = {},
      c = e.dataTypes.slice();
    if (c[1]) for (i in e.converters) d[i.toLowerCase()] = e.converters[i];
    for (o = c.shift(); o; )
      if (
        (e.responseFields[o] && (n[e.responseFields[o]] = t),
        !l && a && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
        (l = o),
        (o = c.shift()))
      )
        if ("*" === o) o = l;
        else if ("*" !== l && l !== o) {
          if (((i = d[l + " " + o] || d["* " + o]), !i))
            for (r in d)
              if (
                ((s = r.split(" ")),
                s[1] === o && (i = d[l + " " + s[0]] || d["* " + s[0]]))
              ) {
                i === !0
                  ? (i = d[r])
                  : d[r] !== !0 && ((o = s[0]), c.unshift(s[1]));
                break;
              }
          if (i !== !0)
            if (i && e["throws"]) t = i(t);
            else
              try {
                t = i(t);
              } catch (u) {
                return {
                  state: "parsererror",
                  error: i ? u : "No conversion from " + l + " to " + o,
                };
              }
        }
    return { state: "success", data: t };
  }
  function V(e, t, n, a) {
    var r;
    if (re.isArray(t))
      re.each(t, function (t, r) {
        n || Ut.test(e)
          ? a(e, r)
          : V(e + "[" + ("object" == typeof r ? t : "") + "]", r, n, a);
      });
    else if (n || "object" !== re.type(t)) a(e, t);
    else for (r in t) V(e + "[" + r + "]", t[r], n, a);
  }
  function z() {
    try {
      return new e.XMLHttpRequest();
    } catch (t) {}
  }
  function Y() {
    try {
      return new e.ActiveXObject("Microsoft.XMLHTTP");
    } catch (t) {}
  }
  function U(e) {
    return re.isWindow(e)
      ? e
      : 9 === e.nodeType && (e.defaultView || e.parentWindow);
  }
  var X = [],
    Q = X.slice,
    K = X.concat,
    J = X.push,
    G = X.indexOf,
    Z = {},
    ee = Z.toString,
    te = Z.hasOwnProperty,
    ne = {},
    ae = "1.11.1",
    re = function (e, t) {
      return new re.fn.init(e, t);
    },
    oe = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
    ie = /^-ms-/,
    se = /-([\da-z])/gi,
    le = function (e, t) {
      return t.toUpperCase();
    };
  (re.fn = re.prototype =
    {
      jquery: ae,
      constructor: re,
      selector: "",
      length: 0,
      toArray: function () {
        return Q.call(this);
      },
      get: function (e) {
        return null != e
          ? 0 > e
            ? this[e + this.length]
            : this[e]
          : Q.call(this);
      },
      pushStack: function (e) {
        var t = re.merge(this.constructor(), e);
        return (t.prevObject = this), (t.context = this.context), t;
      },
      each: function (e, t) {
        return re.each(this, e, t);
      },
      map: function (e) {
        return this.pushStack(
          re.map(this, function (t, n) {
            return e.call(t, n, t);
          })
        );
      },
      slice: function () {
        return this.pushStack(Q.apply(this, arguments));
      },
      first: function () {
        return this.eq(0);
      },
      last: function () {
        return this.eq(-1);
      },
      eq: function (e) {
        var t = this.length,
          n = +e + (0 > e ? t : 0);
        return this.pushStack(n >= 0 && t > n ? [this[n]] : []);
      },
      end: function () {
        return this.prevObject || this.constructor(null);
      },
      push: J,
      sort: X.sort,
      splice: X.splice,
    }),
    (re.extend = re.fn.extend =
      function () {
        var e,
          t,
          n,
          a,
          r,
          o,
          i = arguments[0] || {},
          s = 1,
          l = arguments.length,
          d = !1;
        for (
          "boolean" == typeof i && ((d = i), (i = arguments[s] || {}), s++),
            "object" == typeof i || re.isFunction(i) || (i = {}),
            s === l && ((i = this), s--);
          l > s;
          s++
        )
          if (null != (r = arguments[s]))
            for (a in r)
              (e = i[a]),
                (n = r[a]),
                i !== n &&
                  (d && n && (re.isPlainObject(n) || (t = re.isArray(n)))
                    ? (t
                        ? ((t = !1), (o = e && re.isArray(e) ? e : []))
                        : (o = e && re.isPlainObject(e) ? e : {}),
                      (i[a] = re.extend(d, o, n)))
                    : void 0 !== n && (i[a] = n));
        return i;
      }),
    re.extend({
      expando: "jQuery" + (ae + Math.random()).replace(/\D/g, ""),
      isReady: !0,
      error: function (e) {
        throw new Error(e);
      },
      noop: function () {},
      isFunction: function (e) {
        return "function" === re.type(e);
      },
      isArray:
        Array.isArray ||
        function (e) {
          return "array" === re.type(e);
        },
      isWindow: function (e) {
        return null != e && e == e.window;
      },
      isNumeric: function (e) {
        return !re.isArray(e) && e - parseFloat(e) >= 0;
      },
      isEmptyObject: function (e) {
        var t;
        for (t in e) return !1;
        return !0;
      },
      isPlainObject: function (e) {
        var t;
        if (!e || "object" !== re.type(e) || e.nodeType || re.isWindow(e))
          return !1;
        try {
          if (
            e.constructor &&
            !te.call(e, "constructor") &&
            !te.call(e.constructor.prototype, "isPrototypeOf")
          )
            return !1;
        } catch (n) {
          return !1;
        }
        if (ne.ownLast) for (t in e) return te.call(e, t);
        for (t in e);
        return void 0 === t || te.call(e, t);
      },
      type: function (e) {
        return null == e
          ? e + ""
          : "object" == typeof e || "function" == typeof e
          ? Z[ee.call(e)] || "object"
          : typeof e;
      },
      globalEval: function (t) {
        t &&
          re.trim(t) &&
          (
            e.execScript ||
            function (t) {
              e.eval.call(e, t);
            }
          )(t);
      },
      camelCase: function (e) {
        return e.replace(ie, "ms-").replace(se, le);
      },
      nodeName: function (e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
      },
      each: function (e, t, a) {
        var r,
          o = 0,
          i = e.length,
          s = n(e);
        if (a) {
          if (s) for (; i > o && ((r = t.apply(e[o], a)), r !== !1); o++);
          else for (o in e) if (((r = t.apply(e[o], a)), r === !1)) break;
        } else if (s)
          for (; i > o && ((r = t.call(e[o], o, e[o])), r !== !1); o++);
        else for (o in e) if (((r = t.call(e[o], o, e[o])), r === !1)) break;
        return e;
      },
      trim: function (e) {
        return null == e ? "" : (e + "").replace(oe, "");
      },
      makeArray: function (e, t) {
        var a = t || [];
        return (
          null != e &&
            (n(Object(e))
              ? re.merge(a, "string" == typeof e ? [e] : e)
              : J.call(a, e)),
          a
        );
      },
      inArray: function (e, t, n) {
        var a;
        if (t) {
          if (G) return G.call(t, e, n);
          for (
            a = t.length, n = n ? (0 > n ? Math.max(0, a + n) : n) : 0;
            a > n;
            n++
          )
            if (n in t && t[n] === e) return n;
        }
        return -1;
      },
      merge: function (e, t) {
        for (var n = +t.length, a = 0, r = e.length; n > a; ) e[r++] = t[a++];
        if (n !== n) for (; void 0 !== t[a]; ) e[r++] = t[a++];
        return (e.length = r), e;
      },
      grep: function (e, t, n) {
        for (var a, r = [], o = 0, i = e.length, s = !n; i > o; o++)
          (a = !t(e[o], o)), a !== s && r.push(e[o]);
        return r;
      },
      map: function (e, t, a) {
        var r,
          o = 0,
          i = e.length,
          s = n(e),
          l = [];
        if (s) for (; i > o; o++) (r = t(e[o], o, a)), null != r && l.push(r);
        else for (o in e) (r = t(e[o], o, a)), null != r && l.push(r);
        return K.apply([], l);
      },
      guid: 1,
      proxy: function (e, t) {
        var n, a, r;
        return (
          "string" == typeof t && ((r = e[t]), (t = e), (e = r)),
          re.isFunction(e)
            ? ((n = Q.call(arguments, 2)),
              (a = function () {
                return e.apply(t || this, n.concat(Q.call(arguments)));
              }),
              (a.guid = e.guid = e.guid || re.guid++),
              a)
            : void 0
        );
      },
      now: function () {
        return +new Date();
      },
      support: ne,
    }),
    re.each(
      "Boolean Number String Function Array Date RegExp Object Error".split(
        " "
      ),
      function (e, t) {
        Z["[object " + t + "]"] = t.toLowerCase();
      }
    );
  var de = (function (e) {
    function t(e, t, n, a) {
      var r, o, i, s, l, d, u, f, h, m;
      if (
        ((t ? t.ownerDocument || t : B) !== A && M(t),
        (t = t || A),
        (n = n || []),
        !e || "string" != typeof e)
      )
        return n;
      if (1 !== (s = t.nodeType) && 9 !== s) return [];
      if (P && !a) {
        if ((r = ye.exec(e)))
          if ((i = r[1])) {
            if (9 === s) {
              if (((o = t.getElementById(i)), !o || !o.parentNode)) return n;
              if (o.id === i) return n.push(o), n;
            } else if (
              t.ownerDocument &&
              (o = t.ownerDocument.getElementById(i)) &&
              O(t, o) &&
              o.id === i
            )
              return n.push(o), n;
          } else {
            if (r[2]) return Z.apply(n, t.getElementsByTagName(e)), n;
            if (
              (i = r[3]) &&
              C.getElementsByClassName &&
              t.getElementsByClassName
            )
              return Z.apply(n, t.getElementsByClassName(i)), n;
          }
        if (C.qsa && (!_ || !_.test(e))) {
          if (
            ((f = u = H),
            (h = t),
            (m = 9 === s && e),
            1 === s && "object" !== t.nodeName.toLowerCase())
          ) {
            for (
              d = k(e),
                (u = t.getAttribute("id"))
                  ? (f = u.replace(be, "\\$&"))
                  : t.setAttribute("id", f),
                f = "[id='" + f + "'] ",
                l = d.length;
              l--;

            )
              d[l] = f + p(d[l]);
            (h = ($e.test(e) && c(t.parentNode)) || t), (m = d.join(","));
          }
          if (m)
            try {
              return Z.apply(n, h.querySelectorAll(m)), n;
            } catch (v) {
            } finally {
              u || t.removeAttribute("id");
            }
        }
      }
      return I(e.replace(le, "$1"), t, n, a);
    }
    function n() {
      function e(n, a) {
        return (
          t.push(n + " ") > w.cacheLength && delete e[t.shift()],
          (e[n + " "] = a)
        );
      }
      var t = [];
      return e;
    }
    function a(e) {
      return (e[H] = !0), e;
    }
    function r(e) {
      var t = A.createElement("div");
      try {
        return !!e(t);
      } catch (n) {
        return !1;
      } finally {
        t.parentNode && t.parentNode.removeChild(t), (t = null);
      }
    }
    function o(e, t) {
      for (var n = e.split("|"), a = e.length; a--; ) w.attrHandle[n[a]] = t;
    }
    function i(e, t) {
      var n = t && e,
        a =
          n &&
          1 === e.nodeType &&
          1 === t.nodeType &&
          (~t.sourceIndex || X) - (~e.sourceIndex || X);
      if (a) return a;
      if (n) for (; (n = n.nextSibling); ) if (n === t) return -1;
      return e ? 1 : -1;
    }
    function s(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();
        return "input" === n && t.type === e;
      };
    }
    function l(e) {
      return function (t) {
        var n = t.nodeName.toLowerCase();
        return ("input" === n || "button" === n) && t.type === e;
      };
    }
    function d(e) {
      return a(function (t) {
        return (
          (t = +t),
          a(function (n, a) {
            for (var r, o = e([], n.length, t), i = o.length; i--; )
              n[(r = o[i])] && (n[r] = !(a[r] = n[r]));
          })
        );
      });
    }
    function c(e) {
      return e && typeof e.getElementsByTagName !== U && e;
    }
    function u() {}
    function p(e) {
      for (var t = 0, n = e.length, a = ""; n > t; t++) a += e[t].value;
      return a;
    }
    function f(e, t, n) {
      var a = t.dir,
        r = n && "parentNode" === a,
        o = q++;
      return t.first
        ? function (t, n, o) {
            for (; (t = t[a]); ) if (1 === t.nodeType || r) return e(t, n, o);
          }
        : function (t, n, i) {
            var s,
              l,
              d = [R, o];
            if (i) {
              for (; (t = t[a]); )
                if ((1 === t.nodeType || r) && e(t, n, i)) return !0;
            } else
              for (; (t = t[a]); )
                if (1 === t.nodeType || r) {
                  if (
                    ((l = t[H] || (t[H] = {})),
                    (s = l[a]) && s[0] === R && s[1] === o)
                  )
                    return (d[2] = s[2]);
                  if (((l[a] = d), (d[2] = e(t, n, i)))) return !0;
                }
          };
    }
    function h(e) {
      return e.length > 1
        ? function (t, n, a) {
            for (var r = e.length; r--; ) if (!e[r](t, n, a)) return !1;
            return !0;
          }
        : e[0];
    }
    function m(e, n, a) {
      for (var r = 0, o = n.length; o > r; r++) t(e, n[r], a);
      return a;
    }
    function v(e, t, n, a, r) {
      for (var o, i = [], s = 0, l = e.length, d = null != t; l > s; s++)
        (o = e[s]) && (!n || n(o, a, r)) && (i.push(o), d && t.push(s));
      return i;
    }
    function g(e, t, n, r, o, i) {
      return (
        r && !r[H] && (r = g(r)),
        o && !o[H] && (o = g(o, i)),
        a(function (a, i, s, l) {
          var d,
            c,
            u,
            p = [],
            f = [],
            h = i.length,
            g = a || m(t || "*", s.nodeType ? [s] : s, []),
            y = !e || (!a && t) ? g : v(g, p, e, s, l),
            $ = n ? (o || (a ? e : h || r) ? [] : i) : y;
          if ((n && n(y, $, s, l), r))
            for (d = v($, f), r(d, [], s, l), c = d.length; c--; )
              (u = d[c]) && ($[f[c]] = !(y[f[c]] = u));
          if (a) {
            if (o || e) {
              if (o) {
                for (d = [], c = $.length; c--; )
                  (u = $[c]) && d.push((y[c] = u));
                o(null, ($ = []), d, l);
              }
              for (c = $.length; c--; )
                (u = $[c]) &&
                  (d = o ? te.call(a, u) : p[c]) > -1 &&
                  (a[d] = !(i[d] = u));
            }
          } else ($ = v($ === i ? $.splice(h, $.length) : $)), o ? o(null, i, $, l) : Z.apply(i, $);
        })
      );
    }
    function y(e) {
      for (
        var t,
          n,
          a,
          r = e.length,
          o = w.relative[e[0].type],
          i = o || w.relative[" "],
          s = o ? 1 : 0,
          l = f(
            function (e) {
              return e === t;
            },
            i,
            !0
          ),
          d = f(
            function (e) {
              return te.call(t, e) > -1;
            },
            i,
            !0
          ),
          c = [
            function (e, n, a) {
              return (
                (!o && (a || n !== D)) ||
                ((t = n).nodeType ? l(e, n, a) : d(e, n, a))
              );
            },
          ];
        r > s;
        s++
      )
        if ((n = w.relative[e[s].type])) c = [f(h(c), n)];
        else {
          if (((n = w.filter[e[s].type].apply(null, e[s].matches)), n[H])) {
            for (a = ++s; r > a && !w.relative[e[a].type]; a++);
            return g(
              s > 1 && h(c),
              s > 1 &&
                p(
                  e
                    .slice(0, s - 1)
                    .concat({ value: " " === e[s - 2].type ? "*" : "" })
                ).replace(le, "$1"),
              n,
              a > s && y(e.slice(s, a)),
              r > a && y((e = e.slice(a))),
              r > a && p(e)
            );
          }
          c.push(n);
        }
      return h(c);
    }
    function $(e, n) {
      var r = n.length > 0,
        o = e.length > 0,
        i = function (a, i, s, l, d) {
          var c,
            u,
            p,
            f = 0,
            h = "0",
            m = a && [],
            g = [],
            y = D,
            $ = a || (o && w.find.TAG("*", d)),
            b = (R += null == y ? 1 : Math.random() || 0.1),
            C = $.length;
          for (d && (D = i !== A && i); h !== C && null != (c = $[h]); h++) {
            if (o && c) {
              for (u = 0; (p = e[u++]); )
                if (p(c, i, s)) {
                  l.push(c);
                  break;
                }
              d && (R = b);
            }
            r && ((c = !p && c) && f--, a && m.push(c));
          }
          if (((f += h), r && h !== f)) {
            for (u = 0; (p = n[u++]); ) p(m, g, i, s);
            if (a) {
              if (f > 0) for (; h--; ) m[h] || g[h] || (g[h] = J.call(l));
              g = v(g);
            }
            Z.apply(l, g),
              d && !a && g.length > 0 && f + n.length > 1 && t.uniqueSort(l);
          }
          return d && ((R = b), (D = y)), m;
        };
      return r ? a(i) : i;
    }
    var b,
      C,
      w,
      x,
      T,
      k,
      S,
      I,
      D,
      E,
      F,
      M,
      A,
      N,
      P,
      _,
      j,
      L,
      O,
      H = "sizzle" + -new Date(),
      B = e.document,
      R = 0,
      q = 0,
      W = n(),
      V = n(),
      z = n(),
      Y = function (e, t) {
        return e === t && (F = !0), 0;
      },
      U = "undefined",
      X = 1 << 31,
      Q = {}.hasOwnProperty,
      K = [],
      J = K.pop,
      G = K.push,
      Z = K.push,
      ee = K.slice,
      te =
        K.indexOf ||
        function (e) {
          for (var t = 0, n = this.length; n > t; t++)
            if (this[t] === e) return t;
          return -1;
        },
      ne =
        "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
      ae = "[\\x20\\t\\r\\n\\f]",
      re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
      oe = re.replace("w", "w#"),
      ie =
        "\\[" +
        ae +
        "*(" +
        re +
        ")(?:" +
        ae +
        "*([*^$|!~]?=)" +
        ae +
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
        oe +
        "))|)" +
        ae +
        "*\\]",
      se =
        ":(" +
        re +
        ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
        ie +
        ")*)|.*)\\)|)",
      le = new RegExp(
        "^" + ae + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ae + "+$",
        "g"
      ),
      de = new RegExp("^" + ae + "*," + ae + "*"),
      ce = new RegExp("^" + ae + "*([>+~]|" + ae + ")" + ae + "*"),
      ue = new RegExp("=" + ae + "*([^\\]'\"]*?)" + ae + "*\\]", "g"),
      pe = new RegExp(se),
      fe = new RegExp("^" + oe + "$"),
      he = {
        ID: new RegExp("^#(" + re + ")"),
        CLASS: new RegExp("^\\.(" + re + ")"),
        TAG: new RegExp("^(" + re.replace("w", "w*") + ")"),
        ATTR: new RegExp("^" + ie),
        PSEUDO: new RegExp("^" + se),
        CHILD: new RegExp(
          "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
            ae +
            "*(even|odd|(([+-]|)(\\d*)n|)" +
            ae +
            "*(?:([+-]|)" +
            ae +
            "*(\\d+)|))" +
            ae +
            "*\\)|)",
          "i"
        ),
        bool: new RegExp("^(?:" + ne + ")$", "i"),
        needsContext: new RegExp(
          "^" +
            ae +
            "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
            ae +
            "*((?:-\\d)?\\d*)" +
            ae +
            "*\\)|)(?=[^-]|$)",
          "i"
        ),
      },
      me = /^(?:input|select|textarea|button)$/i,
      ve = /^h\d$/i,
      ge = /^[^{]+\{\s*\[native \w/,
      ye = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
      $e = /[+~]/,
      be = /'|\\/g,
      Ce = new RegExp("\\\\([\\da-f]{1,6}" + ae + "?|(" + ae + ")|.)", "ig"),
      we = function (e, t, n) {
        var a = "0x" + t - 65536;
        return a !== a || n
          ? t
          : 0 > a
          ? String.fromCharCode(a + 65536)
          : String.fromCharCode((a >> 10) | 55296, (1023 & a) | 56320);
      };
    try {
      Z.apply((K = ee.call(B.childNodes)), B.childNodes),
        K[B.childNodes.length].nodeType;
    } catch (xe) {
      Z = {
        apply: K.length
          ? function (e, t) {
              G.apply(e, ee.call(t));
            }
          : function (e, t) {
              for (var n = e.length, a = 0; (e[n++] = t[a++]); );
              e.length = n - 1;
            },
      };
    }
    (C = t.support = {}),
      (T = t.isXML =
        function (e) {
          var t = e && (e.ownerDocument || e).documentElement;
          return !!t && "HTML" !== t.nodeName;
        }),
      (M = t.setDocument =
        function (e) {
          var t,
            n = e ? e.ownerDocument || e : B,
            a = n.defaultView;
          return n !== A && 9 === n.nodeType && n.documentElement
            ? ((A = n),
              (N = n.documentElement),
              (P = !T(n)),
              a &&
                a !== a.top &&
                (a.addEventListener
                  ? a.addEventListener(
                      "unload",
                      function () {
                        M();
                      },
                      !1
                    )
                  : a.attachEvent &&
                    a.attachEvent("onunload", function () {
                      M();
                    })),
              (C.attributes = r(function (e) {
                return (e.className = "i"), !e.getAttribute("className");
              })),
              (C.getElementsByTagName = r(function (e) {
                return (
                  e.appendChild(n.createComment("")),
                  !e.getElementsByTagName("*").length
                );
              })),
              (C.getElementsByClassName =
                ge.test(n.getElementsByClassName) &&
                r(function (e) {
                  return (
                    (e.innerHTML =
                      "<div class='a'></div><div class='a i'></div>"),
                    (e.firstChild.className = "i"),
                    2 === e.getElementsByClassName("i").length
                  );
                })),
              (C.getById = r(function (e) {
                return (
                  (N.appendChild(e).id = H),
                  !n.getElementsByName || !n.getElementsByName(H).length
                );
              })),
              C.getById
                ? ((w.find.ID = function (e, t) {
                    if (typeof t.getElementById !== U && P) {
                      var n = t.getElementById(e);
                      return n && n.parentNode ? [n] : [];
                    }
                  }),
                  (w.filter.ID = function (e) {
                    var t = e.replace(Ce, we);
                    return function (e) {
                      return e.getAttribute("id") === t;
                    };
                  }))
                : (delete w.find.ID,
                  (w.filter.ID = function (e) {
                    var t = e.replace(Ce, we);
                    return function (e) {
                      var n =
                        typeof e.getAttributeNode !== U &&
                        e.getAttributeNode("id");
                      return n && n.value === t;
                    };
                  })),
              (w.find.TAG = C.getElementsByTagName
                ? function (e, t) {
                    return typeof t.getElementsByTagName !== U
                      ? t.getElementsByTagName(e)
                      : void 0;
                  }
                : function (e, t) {
                    var n,
                      a = [],
                      r = 0,
                      o = t.getElementsByTagName(e);
                    if ("*" === e) {
                      for (; (n = o[r++]); ) 1 === n.nodeType && a.push(n);
                      return a;
                    }
                    return o;
                  }),
              (w.find.CLASS =
                C.getElementsByClassName &&
                function (e, t) {
                  return typeof t.getElementsByClassName !== U && P
                    ? t.getElementsByClassName(e)
                    : void 0;
                }),
              (j = []),
              (_ = []),
              (C.qsa = ge.test(n.querySelectorAll)) &&
                (r(function (e) {
                  (e.innerHTML =
                    "<select msallowclip=''><option selected=''></option></select>"),
                    e.querySelectorAll("[msallowclip^='']").length &&
                      _.push("[*^$]=" + ae + "*(?:''|\"\")"),
                    e.querySelectorAll("[selected]").length ||
                      _.push("\\[" + ae + "*(?:value|" + ne + ")"),
                    e.querySelectorAll(":checked").length || _.push(":checked");
                }),
                r(function (e) {
                  var t = n.createElement("input");
                  t.setAttribute("type", "hidden"),
                    e.appendChild(t).setAttribute("name", "D"),
                    e.querySelectorAll("[name=d]").length &&
                      _.push("name" + ae + "*[*^$|!~]?="),
                    e.querySelectorAll(":enabled").length ||
                      _.push(":enabled", ":disabled"),
                    e.querySelectorAll("*,:x"),
                    _.push(",.*:");
                })),
              (C.matchesSelector = ge.test(
                (L =
                  N.matches ||
                  N.webkitMatchesSelector ||
                  N.mozMatchesSelector ||
                  N.oMatchesSelector ||
                  N.msMatchesSelector)
              )) &&
                r(function (e) {
                  (C.disconnectedMatch = L.call(e, "div")),
                    L.call(e, "[s!='']:x"),
                    j.push("!=", se);
                }),
              (_ = _.length && new RegExp(_.join("|"))),
              (j = j.length && new RegExp(j.join("|"))),
              (t = ge.test(N.compareDocumentPosition)),
              (O =
                t || ge.test(N.contains)
                  ? function (e, t) {
                      var n = 9 === e.nodeType ? e.documentElement : e,
                        a = t && t.parentNode;
                      return (
                        e === a ||
                        !(
                          !a ||
                          1 !== a.nodeType ||
                          !(n.contains
                            ? n.contains(a)
                            : e.compareDocumentPosition &&
                              16 & e.compareDocumentPosition(a))
                        )
                      );
                    }
                  : function (e, t) {
                      if (t)
                        for (; (t = t.parentNode); ) if (t === e) return !0;
                      return !1;
                    }),
              (Y = t
                ? function (e, t) {
                    if (e === t) return (F = !0), 0;
                    var a =
                      !e.compareDocumentPosition - !t.compareDocumentPosition;
                    return a
                      ? a
                      : ((a =
                          (e.ownerDocument || e) === (t.ownerDocument || t)
                            ? e.compareDocumentPosition(t)
                            : 1),
                        1 & a ||
                        (!C.sortDetached && t.compareDocumentPosition(e) === a)
                          ? e === n || (e.ownerDocument === B && O(B, e))
                            ? -1
                            : t === n || (t.ownerDocument === B && O(B, t))
                            ? 1
                            : E
                            ? te.call(E, e) - te.call(E, t)
                            : 0
                          : 4 & a
                          ? -1
                          : 1);
                  }
                : function (e, t) {
                    if (e === t) return (F = !0), 0;
                    var a,
                      r = 0,
                      o = e.parentNode,
                      s = t.parentNode,
                      l = [e],
                      d = [t];
                    if (!o || !s)
                      return e === n
                        ? -1
                        : t === n
                        ? 1
                        : o
                        ? -1
                        : s
                        ? 1
                        : E
                        ? te.call(E, e) - te.call(E, t)
                        : 0;
                    if (o === s) return i(e, t);
                    for (a = e; (a = a.parentNode); ) l.unshift(a);
                    for (a = t; (a = a.parentNode); ) d.unshift(a);
                    for (; l[r] === d[r]; ) r++;
                    return r
                      ? i(l[r], d[r])
                      : l[r] === B
                      ? -1
                      : d[r] === B
                      ? 1
                      : 0;
                  }),
              n)
            : A;
        }),
      (t.matches = function (e, n) {
        return t(e, null, null, n);
      }),
      (t.matchesSelector = function (e, n) {
        if (
          ((e.ownerDocument || e) !== A && M(e),
          (n = n.replace(ue, "='$1']")),
          !(!C.matchesSelector || !P || (j && j.test(n)) || (_ && _.test(n))))
        )
          try {
            var a = L.call(e, n);
            if (
              a ||
              C.disconnectedMatch ||
              (e.document && 11 !== e.document.nodeType)
            )
              return a;
          } catch (r) {}
        return t(n, A, null, [e]).length > 0;
      }),
      (t.contains = function (e, t) {
        return (e.ownerDocument || e) !== A && M(e), O(e, t);
      }),
      (t.attr = function (e, t) {
        (e.ownerDocument || e) !== A && M(e);
        var n = w.attrHandle[t.toLowerCase()],
          a = n && Q.call(w.attrHandle, t.toLowerCase()) ? n(e, t, !P) : void 0;
        return void 0 !== a
          ? a
          : C.attributes || !P
          ? e.getAttribute(t)
          : (a = e.getAttributeNode(t)) && a.specified
          ? a.value
          : null;
      }),
      (t.error = function (e) {
        throw new Error("Syntax error, unrecognized expression: " + e);
      }),
      (t.uniqueSort = function (e) {
        var t,
          n = [],
          a = 0,
          r = 0;
        if (
          ((F = !C.detectDuplicates),
          (E = !C.sortStable && e.slice(0)),
          e.sort(Y),
          F)
        ) {
          for (; (t = e[r++]); ) t === e[r] && (a = n.push(r));
          for (; a--; ) e.splice(n[a], 1);
        }
        return (E = null), e;
      }),
      (x = t.getText =
        function (e) {
          var t,
            n = "",
            a = 0,
            r = e.nodeType;
          if (r) {
            if (1 === r || 9 === r || 11 === r) {
              if ("string" == typeof e.textContent) return e.textContent;
              for (e = e.firstChild; e; e = e.nextSibling) n += x(e);
            } else if (3 === r || 4 === r) return e.nodeValue;
          } else for (; (t = e[a++]); ) n += x(t);
          return n;
        }),
      (w = t.selectors =
        {
          cacheLength: 50,
          createPseudo: a,
          match: he,
          attrHandle: {},
          find: {},
          relative: {
            ">": { dir: "parentNode", first: !0 },
            " ": { dir: "parentNode" },
            "+": { dir: "previousSibling", first: !0 },
            "~": { dir: "previousSibling" },
          },
          preFilter: {
            ATTR: function (e) {
              return (
                (e[1] = e[1].replace(Ce, we)),
                (e[3] = (e[3] || e[4] || e[5] || "").replace(Ce, we)),
                "~=" === e[2] && (e[3] = " " + e[3] + " "),
                e.slice(0, 4)
              );
            },
            CHILD: function (e) {
              return (
                (e[1] = e[1].toLowerCase()),
                "nth" === e[1].slice(0, 3)
                  ? (e[3] || t.error(e[0]),
                    (e[4] = +(e[4]
                      ? e[5] + (e[6] || 1)
                      : 2 * ("even" === e[3] || "odd" === e[3]))),
                    (e[5] = +(e[7] + e[8] || "odd" === e[3])))
                  : e[3] && t.error(e[0]),
                e
              );
            },
            PSEUDO: function (e) {
              var t,
                n = !e[6] && e[2];
              return he.CHILD.test(e[0])
                ? null
                : (e[3]
                    ? (e[2] = e[4] || e[5] || "")
                    : n &&
                      pe.test(n) &&
                      (t = k(n, !0)) &&
                      (t = n.indexOf(")", n.length - t) - n.length) &&
                      ((e[0] = e[0].slice(0, t)), (e[2] = n.slice(0, t))),
                  e.slice(0, 3));
            },
          },
          filter: {
            TAG: function (e) {
              var t = e.replace(Ce, we).toLowerCase();
              return "*" === e
                ? function () {
                    return !0;
                  }
                : function (e) {
                    return e.nodeName && e.nodeName.toLowerCase() === t;
                  };
            },
            CLASS: function (e) {
              var t = W[e + " "];
              return (
                t ||
                ((t = new RegExp("(^|" + ae + ")" + e + "(" + ae + "|$)")) &&
                  W(e, function (e) {
                    return t.test(
                      ("string" == typeof e.className && e.className) ||
                        (typeof e.getAttribute !== U &&
                          e.getAttribute("class")) ||
                        ""
                    );
                  }))
              );
            },
            ATTR: function (e, n, a) {
              return function (r) {
                var o = t.attr(r, e);
                return null == o
                  ? "!=" === n
                  : !n ||
                      ((o += ""),
                      "=" === n
                        ? o === a
                        : "!=" === n
                        ? o !== a
                        : "^=" === n
                        ? a && 0 === o.indexOf(a)
                        : "*=" === n
                        ? a && o.indexOf(a) > -1
                        : "$=" === n
                        ? a && o.slice(-a.length) === a
                        : "~=" === n
                        ? (" " + o + " ").indexOf(a) > -1
                        : "|=" === n &&
                          (o === a || o.slice(0, a.length + 1) === a + "-"));
              };
            },
            CHILD: function (e, t, n, a, r) {
              var o = "nth" !== e.slice(0, 3),
                i = "last" !== e.slice(-4),
                s = "of-type" === t;
              return 1 === a && 0 === r
                ? function (e) {
                    return !!e.parentNode;
                  }
                : function (t, n, l) {
                    var d,
                      c,
                      u,
                      p,
                      f,
                      h,
                      m = o !== i ? "nextSibling" : "previousSibling",
                      v = t.parentNode,
                      g = s && t.nodeName.toLowerCase(),
                      y = !l && !s;
                    if (v) {
                      if (o) {
                        for (; m; ) {
                          for (u = t; (u = u[m]); )
                            if (
                              s
                                ? u.nodeName.toLowerCase() === g
                                : 1 === u.nodeType
                            )
                              return !1;
                          h = m = "only" === e && !h && "nextSibling";
                        }
                        return !0;
                      }
                      if (((h = [i ? v.firstChild : v.lastChild]), i && y)) {
                        for (
                          c = v[H] || (v[H] = {}),
                            d = c[e] || [],
                            f = d[0] === R && d[1],
                            p = d[0] === R && d[2],
                            u = f && v.childNodes[f];
                          (u = (++f && u && u[m]) || (p = f = 0) || h.pop());

                        )
                          if (1 === u.nodeType && ++p && u === t) {
                            c[e] = [R, f, p];
                            break;
                          }
                      } else if (
                        y &&
                        (d = (t[H] || (t[H] = {}))[e]) &&
                        d[0] === R
                      )
                        p = d[1];
                      else
                        for (
                          ;
                          (u = (++f && u && u[m]) || (p = f = 0) || h.pop()) &&
                          ((s
                            ? u.nodeName.toLowerCase() !== g
                            : 1 !== u.nodeType) ||
                            !++p ||
                            (y && ((u[H] || (u[H] = {}))[e] = [R, p]),
                            u !== t));

                        );
                      return (p -= r), p === a || (p % a === 0 && p / a >= 0);
                    }
                  };
            },
            PSEUDO: function (e, n) {
              var r,
                o =
                  w.pseudos[e] ||
                  w.setFilters[e.toLowerCase()] ||
                  t.error("unsupported pseudo: " + e);
              return o[H]
                ? o(n)
                : o.length > 1
                ? ((r = [e, e, "", n]),
                  w.setFilters.hasOwnProperty(e.toLowerCase())
                    ? a(function (e, t) {
                        for (var a, r = o(e, n), i = r.length; i--; )
                          (a = te.call(e, r[i])), (e[a] = !(t[a] = r[i]));
                      })
                    : function (e) {
                        return o(e, 0, r);
                      })
                : o;
            },
          },
          pseudos: {
            not: a(function (e) {
              var t = [],
                n = [],
                r = S(e.replace(le, "$1"));
              return r[H]
                ? a(function (e, t, n, a) {
                    for (var o, i = r(e, null, a, []), s = e.length; s--; )
                      (o = i[s]) && (e[s] = !(t[s] = o));
                  })
                : function (e, a, o) {
                    return (t[0] = e), r(t, null, o, n), !n.pop();
                  };
            }),
            has: a(function (e) {
              return function (n) {
                return t(e, n).length > 0;
              };
            }),
            contains: a(function (e) {
              return function (t) {
                return (t.textContent || t.innerText || x(t)).indexOf(e) > -1;
              };
            }),
            lang: a(function (e) {
              return (
                fe.test(e || "") || t.error("unsupported lang: " + e),
                (e = e.replace(Ce, we).toLowerCase()),
                function (t) {
                  var n;
                  do
                    if (
                      (n = P
                        ? t.lang
                        : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                    )
                      return (
                        (n = n.toLowerCase()),
                        n === e || 0 === n.indexOf(e + "-")
                      );
                  while ((t = t.parentNode) && 1 === t.nodeType);
                  return !1;
                }
              );
            }),
            target: function (t) {
              var n = e.location && e.location.hash;
              return n && n.slice(1) === t.id;
            },
            root: function (e) {
              return e === N;
            },
            focus: function (e) {
              return (
                e === A.activeElement &&
                (!A.hasFocus || A.hasFocus()) &&
                !!(e.type || e.href || ~e.tabIndex)
              );
            },
            enabled: function (e) {
              return e.disabled === !1;
            },
            disabled: function (e) {
              return e.disabled === !0;
            },
            checked: function (e) {
              var t = e.nodeName.toLowerCase();
              return (
                ("input" === t && !!e.checked) ||
                ("option" === t && !!e.selected)
              );
            },
            selected: function (e) {
              return (
                e.parentNode && e.parentNode.selectedIndex, e.selected === !0
              );
            },
            empty: function (e) {
              for (e = e.firstChild; e; e = e.nextSibling)
                if (e.nodeType < 6) return !1;
              return !0;
            },
            parent: function (e) {
              return !w.pseudos.empty(e);
            },
            header: function (e) {
              return ve.test(e.nodeName);
            },
            input: function (e) {
              return me.test(e.nodeName);
            },
            button: function (e) {
              var t = e.nodeName.toLowerCase();
              return ("input" === t && "button" === e.type) || "button" === t;
            },
            text: function (e) {
              var t;
              return (
                "input" === e.nodeName.toLowerCase() &&
                "text" === e.type &&
                (null == (t = e.getAttribute("type")) ||
                  "text" === t.toLowerCase())
              );
            },
            first: d(function () {
              return [0];
            }),
            last: d(function (e, t) {
              return [t - 1];
            }),
            eq: d(function (e, t, n) {
              return [0 > n ? n + t : n];
            }),
            even: d(function (e, t) {
              for (var n = 0; t > n; n += 2) e.push(n);
              return e;
            }),
            odd: d(function (e, t) {
              for (var n = 1; t > n; n += 2) e.push(n);
              return e;
            }),
            lt: d(function (e, t, n) {
              for (var a = 0 > n ? n + t : n; --a >= 0; ) e.push(a);
              return e;
            }),
            gt: d(function (e, t, n) {
              for (var a = 0 > n ? n + t : n; ++a < t; ) e.push(a);
              return e;
            }),
          },
        }),
      (w.pseudos.nth = w.pseudos.eq);
    for (b in { radio: !0, checkbox: !0, file: !0, password: !0, image: !0 })
      w.pseudos[b] = s(b);
    for (b in { submit: !0, reset: !0 }) w.pseudos[b] = l(b);
    return (
      (u.prototype = w.filters = w.pseudos),
      (w.setFilters = new u()),
      (k = t.tokenize =
        function (e, n) {
          var a,
            r,
            o,
            i,
            s,
            l,
            d,
            c = V[e + " "];
          if (c) return n ? 0 : c.slice(0);
          for (s = e, l = [], d = w.preFilter; s; ) {
            (!a || (r = de.exec(s))) &&
              (r && (s = s.slice(r[0].length) || s), l.push((o = []))),
              (a = !1),
              (r = ce.exec(s)) &&
                ((a = r.shift()),
                o.push({ value: a, type: r[0].replace(le, " ") }),
                (s = s.slice(a.length)));
            for (i in w.filter)
              !(r = he[i].exec(s)) ||
                (d[i] && !(r = d[i](r))) ||
                ((a = r.shift()),
                o.push({ value: a, type: i, matches: r }),
                (s = s.slice(a.length)));
            if (!a) break;
          }
          return n ? s.length : s ? t.error(e) : V(e, l).slice(0);
        }),
      (S = t.compile =
        function (e, t) {
          var n,
            a = [],
            r = [],
            o = z[e + " "];
          if (!o) {
            for (t || (t = k(e)), n = t.length; n--; )
              (o = y(t[n])), o[H] ? a.push(o) : r.push(o);
            (o = z(e, $(r, a))), (o.selector = e);
          }
          return o;
        }),
      (I = t.select =
        function (e, t, n, a) {
          var r,
            o,
            i,
            s,
            l,
            d = "function" == typeof e && e,
            u = !a && k((e = d.selector || e));
          if (((n = n || []), 1 === u.length)) {
            if (
              ((o = u[0] = u[0].slice(0)),
              o.length > 2 &&
                "ID" === (i = o[0]).type &&
                C.getById &&
                9 === t.nodeType &&
                P &&
                w.relative[o[1].type])
            ) {
              if (
                ((t = (w.find.ID(i.matches[0].replace(Ce, we), t) || [])[0]),
                !t)
              )
                return n;
              d && (t = t.parentNode), (e = e.slice(o.shift().value.length));
            }
            for (
              r = he.needsContext.test(e) ? 0 : o.length;
              r-- && ((i = o[r]), !w.relative[(s = i.type)]);

            )
              if (
                (l = w.find[s]) &&
                (a = l(
                  i.matches[0].replace(Ce, we),
                  ($e.test(o[0].type) && c(t.parentNode)) || t
                ))
              ) {
                if ((o.splice(r, 1), (e = a.length && p(o)), !e))
                  return Z.apply(n, a), n;
                break;
              }
          }
          return (
            (d || S(e, u))(a, t, !P, n, ($e.test(e) && c(t.parentNode)) || t), n
          );
        }),
      (C.sortStable = H.split("").sort(Y).join("") === H),
      (C.detectDuplicates = !!F),
      M(),
      (C.sortDetached = r(function (e) {
        return 1 & e.compareDocumentPosition(A.createElement("div"));
      })),
      r(function (e) {
        return (
          (e.innerHTML = "<a href='#'></a>"),
          "#" === e.firstChild.getAttribute("href")
        );
      }) ||
        o("type|href|height|width", function (e, t, n) {
          return n
            ? void 0
            : e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2);
        }),
      (C.attributes &&
        r(function (e) {
          return (
            (e.innerHTML = "<input/>"),
            e.firstChild.setAttribute("value", ""),
            "" === e.firstChild.getAttribute("value")
          );
        })) ||
        o("value", function (e, t, n) {
          return n || "input" !== e.nodeName.toLowerCase()
            ? void 0
            : e.defaultValue;
        }),
      r(function (e) {
        return null == e.getAttribute("disabled");
      }) ||
        o(ne, function (e, t, n) {
          var a;
          return n
            ? void 0
            : e[t] === !0
            ? t.toLowerCase()
            : (a = e.getAttributeNode(t)) && a.specified
            ? a.value
            : null;
        }),
      t
    );
  })(e);
  (re.find = de),
    (re.expr = de.selectors),
    (re.expr[":"] = re.expr.pseudos),
    (re.unique = de.uniqueSort),
    (re.text = de.getText),
    (re.isXMLDoc = de.isXML),
    (re.contains = de.contains);
  var ce = re.expr.match.needsContext,
    ue = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    pe = /^.[^:#\[\.,]*$/;
  (re.filter = function (e, t, n) {
    var a = t[0];
    return (
      n && (e = ":not(" + e + ")"),
      1 === t.length && 1 === a.nodeType
        ? re.find.matchesSelector(a, e)
          ? [a]
          : []
        : re.find.matches(
            e,
            re.grep(t, function (e) {
              return 1 === e.nodeType;
            })
          )
    );
  }),
    re.fn.extend({
      find: function (e) {
        var t,
          n = [],
          a = this,
          r = a.length;
        if ("string" != typeof e)
          return this.pushStack(
            re(e).filter(function () {
              for (t = 0; r > t; t++) if (re.contains(a[t], this)) return !0;
            })
          );
        for (t = 0; r > t; t++) re.find(e, a[t], n);
        return (
          (n = this.pushStack(r > 1 ? re.unique(n) : n)),
          (n.selector = this.selector ? this.selector + " " + e : e),
          n
        );
      },
      filter: function (e) {
        return this.pushStack(a(this, e || [], !1));
      },
      not: function (e) {
        return this.pushStack(a(this, e || [], !0));
      },
      is: function (e) {
        return !!a(
          this,
          "string" == typeof e && ce.test(e) ? re(e) : e || [],
          !1
        ).length;
      },
    });
  var fe,
    he = e.document,
    me = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
    ve = (re.fn.init = function (e, t) {
      var n, a;
      if (!e) return this;
      if ("string" == typeof e) {
        if (
          ((n =
            "<" === e.charAt(0) &&
            ">" === e.charAt(e.length - 1) &&
            e.length >= 3
              ? [null, e, null]
              : me.exec(e)),
          !n || (!n[1] && t))
        )
          return !t || t.jquery
            ? (t || fe).find(e)
            : this.constructor(t).find(e);
        if (n[1]) {
          if (
            ((t = t instanceof re ? t[0] : t),
            re.merge(
              this,
              re.parseHTML(
                n[1],
                t && t.nodeType ? t.ownerDocument || t : he,
                !0
              )
            ),
            ue.test(n[1]) && re.isPlainObject(t))
          )
            for (n in t)
              re.isFunction(this[n]) ? this[n](t[n]) : this.attr(n, t[n]);
          return this;
        }
        if (((a = he.getElementById(n[2])), a && a.parentNode)) {
          if (a.id !== n[2]) return fe.find(e);
          (this.length = 1), (this[0] = a);
        }
        return (this.context = he), (this.selector = e), this;
      }
      return e.nodeType
        ? ((this.context = this[0] = e), (this.length = 1), this)
        : re.isFunction(e)
        ? "undefined" != typeof fe.ready
          ? fe.ready(e)
          : e(re)
        : (void 0 !== e.selector &&
            ((this.selector = e.selector), (this.context = e.context)),
          re.makeArray(e, this));
    });
  (ve.prototype = re.fn), (fe = re(he));
  var ge = /^(?:parents|prev(?:Until|All))/,
    ye = { children: !0, contents: !0, next: !0, prev: !0 };
  re.extend({
    dir: function (e, t, n) {
      for (
        var a = [], r = e[t];
        r &&
        9 !== r.nodeType &&
        (void 0 === n || 1 !== r.nodeType || !re(r).is(n));

      )
        1 === r.nodeType && a.push(r), (r = r[t]);
      return a;
    },
    sibling: function (e, t) {
      for (var n = []; e; e = e.nextSibling)
        1 === e.nodeType && e !== t && n.push(e);
      return n;
    },
  }),
    re.fn.extend({
      has: function (e) {
        var t,
          n = re(e, this),
          a = n.length;
        return this.filter(function () {
          for (t = 0; a > t; t++) if (re.contains(this, n[t])) return !0;
        });
      },
      closest: function (e, t) {
        for (
          var n,
            a = 0,
            r = this.length,
            o = [],
            i =
              ce.test(e) || "string" != typeof e ? re(e, t || this.context) : 0;
          r > a;
          a++
        )
          for (n = this[a]; n && n !== t; n = n.parentNode)
            if (
              n.nodeType < 11 &&
              (i
                ? i.index(n) > -1
                : 1 === n.nodeType && re.find.matchesSelector(n, e))
            ) {
              o.push(n);
              break;
            }
        return this.pushStack(o.length > 1 ? re.unique(o) : o);
      },
      index: function (e) {
        return e
          ? "string" == typeof e
            ? re.inArray(this[0], re(e))
            : re.inArray(e.jquery ? e[0] : e, this)
          : this[0] && this[0].parentNode
          ? this.first().prevAll().length
          : -1;
      },
      add: function (e, t) {
        return this.pushStack(re.unique(re.merge(this.get(), re(e, t))));
      },
      addBack: function (e) {
        return this.add(
          null == e ? this.prevObject : this.prevObject.filter(e)
        );
      },
    }),
    re.each(
      {
        parent: function (e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null;
        },
        parents: function (e) {
          return re.dir(e, "parentNode");
        },
        parentsUntil: function (e, t, n) {
          return re.dir(e, "parentNode", n);
        },
        next: function (e) {
          return r(e, "nextSibling");
        },
        prev: function (e) {
          return r(e, "previousSibling");
        },
        nextAll: function (e) {
          return re.dir(e, "nextSibling");
        },
        prevAll: function (e) {
          return re.dir(e, "previousSibling");
        },
        nextUntil: function (e, t, n) {
          return re.dir(e, "nextSibling", n);
        },
        prevUntil: function (e, t, n) {
          return re.dir(e, "previousSibling", n);
        },
        siblings: function (e) {
          return re.sibling((e.parentNode || {}).firstChild, e);
        },
        children: function (e) {
          return re.sibling(e.firstChild);
        },
        contents: function (e) {
          return re.nodeName(e, "iframe")
            ? e.contentDocument || e.contentWindow.document
            : re.merge([], e.childNodes);
        },
      },
      function (e, t) {
        re.fn[e] = function (n, a) {
          var r = re.map(this, t, n);
          return (
            "Until" !== e.slice(-5) && (a = n),
            a && "string" == typeof a && (r = re.filter(a, r)),
            this.length > 1 &&
              (ye[e] || (r = re.unique(r)), ge.test(e) && (r = r.reverse())),
            this.pushStack(r)
          );
        };
      }
    );
  var $e = /\S+/g,
    be = {};
  (re.Callbacks = function (e) {
    e = "string" == typeof e ? be[e] || o(e) : re.extend({}, e);
    var t,
      n,
      a,
      r,
      i,
      s,
      l = [],
      d = !e.once && [],
      c = function (o) {
        for (
          n = e.memory && o, a = !0, i = s || 0, s = 0, r = l.length, t = !0;
          l && r > i;
          i++
        )
          if (l[i].apply(o[0], o[1]) === !1 && e.stopOnFalse) {
            n = !1;
            break;
          }
        (t = !1),
          l && (d ? d.length && c(d.shift()) : n ? (l = []) : u.disable());
      },
      u = {
        add: function () {
          if (l) {
            var a = l.length;
            !(function o(t) {
              re.each(t, function (t, n) {
                var a = re.type(n);
                "function" === a
                  ? (e.unique && u.has(n)) || l.push(n)
                  : n && n.length && "string" !== a && o(n);
              });
            })(arguments),
              t ? (r = l.length) : n && ((s = a), c(n));
          }
          return this;
        },
        remove: function () {
          return (
            l &&
              re.each(arguments, function (e, n) {
                for (var a; (a = re.inArray(n, l, a)) > -1; )
                  l.splice(a, 1), t && (r >= a && r--, i >= a && i--);
              }),
            this
          );
        },
        has: function (e) {
          return e ? re.inArray(e, l) > -1 : !(!l || !l.length);
        },
        empty: function () {
          return (l = []), (r = 0), this;
        },
        disable: function () {
          return (l = d = n = void 0), this;
        },
        disabled: function () {
          return !l;
        },
        lock: function () {
          return (d = void 0), n || u.disable(), this;
        },
        locked: function () {
          return !d;
        },
        fireWith: function (e, n) {
          return (
            !l ||
              (a && !d) ||
              ((n = n || []),
              (n = [e, n.slice ? n.slice() : n]),
              t ? d.push(n) : c(n)),
            this
          );
        },
        fire: function () {
          return u.fireWith(this, arguments), this;
        },
        fired: function () {
          return !!a;
        },
      };
    return u;
  }),
    re.extend({
      Deferred: function (e) {
        var t = [
            ["resolve", "done", re.Callbacks("once memory"), "resolved"],
            ["reject", "fail", re.Callbacks("once memory"), "rejected"],
            ["notify", "progress", re.Callbacks("memory")],
          ],
          n = "pending",
          a = {
            state: function () {
              return n;
            },
            always: function () {
              return r.done(arguments).fail(arguments), this;
            },
            then: function () {
              var e = arguments;
              return re
                .Deferred(function (n) {
                  re.each(t, function (t, o) {
                    var i = re.isFunction(e[t]) && e[t];
                    r[o[1]](function () {
                      var e = i && i.apply(this, arguments);
                      e && re.isFunction(e.promise)
                        ? e
                            .promise()
                            .done(n.resolve)
                            .fail(n.reject)
                            .progress(n.notify)
                        : n[o[0] + "With"](
                            this === a ? n.promise() : this,
                            i ? [e] : arguments
                          );
                    });
                  }),
                    (e = null);
                })
                .promise();
            },
            promise: function (e) {
              return null != e ? re.extend(e, a) : a;
            },
          },
          r = {};
        return (
          (a.pipe = a.then),
          re.each(t, function (e, o) {
            var i = o[2],
              s = o[3];
            (a[o[1]] = i.add),
              s &&
                i.add(
                  function () {
                    n = s;
                  },
                  t[1 ^ e][2].disable,
                  t[2][2].lock
                ),
              (r[o[0]] = function () {
                return r[o[0] + "With"](this === r ? a : this, arguments), this;
              }),
              (r[o[0] + "With"] = i.fireWith);
          }),
          a.promise(r),
          e && e.call(r, r),
          r
        );
      },
      when: function (e) {
        var t,
          n,
          a,
          r = 0,
          o = Q.call(arguments),
          i = o.length,
          s = 1 !== i || (e && re.isFunction(e.promise)) ? i : 0,
          l = 1 === s ? e : re.Deferred(),
          d = function (e, n, a) {
            return function (r) {
              (n[e] = this),
                (a[e] = arguments.length > 1 ? Q.call(arguments) : r),
                a === t ? l.notifyWith(n, a) : --s || l.resolveWith(n, a);
            };
          };
        if (i > 1)
          for (t = new Array(i), n = new Array(i), a = new Array(i); i > r; r++)
            o[r] && re.isFunction(o[r].promise)
              ? o[r]
                  .promise()
                  .done(d(r, a, o))
                  .fail(l.reject)
                  .progress(d(r, n, t))
              : --s;
        return s || l.resolveWith(a, o), l.promise();
      },
    });
  var Ce;
  (re.fn.ready = function (e) {
    return re.ready.promise().done(e), this;
  }),
    re.extend({
      isReady: !1,
      readyWait: 1,
      holdReady: function (e) {
        e ? re.readyWait++ : re.ready(!0);
      },
      ready: function (e) {
        if (e === !0 ? !--re.readyWait : !re.isReady) {
          if (!he.body) return setTimeout(re.ready);
          (re.isReady = !0),
            (e !== !0 && --re.readyWait > 0) ||
              (Ce.resolveWith(he, [re]),
              re.fn.triggerHandler &&
                (re(he).triggerHandler("ready"), re(he).off("ready")));
        }
      },
    }),
    (re.ready.promise = function (t) {
      if (!Ce)
        if (((Ce = re.Deferred()), "complete" === he.readyState))
          setTimeout(re.ready);
        else if (he.addEventListener)
          he.addEventListener("DOMContentLoaded", s, !1),
            e.addEventListener("load", s, !1);
        else {
          he.attachEvent("onreadystatechange", s), e.attachEvent("onload", s);
          var n = !1;
          try {
            n = null == e.frameElement && he.documentElement;
          } catch (a) {}
          n &&
            n.doScroll &&
            !(function r() {
              if (!re.isReady) {
                try {
                  n.doScroll("left");
                } catch (e) {
                  return setTimeout(r, 50);
                }
                i(), re.ready();
              }
            })();
        }
      return Ce.promise(t);
    });
  var we,
    xe = "undefined";
  for (we in re(ne)) break;
  (ne.ownLast = "0" !== we),
    (ne.inlineBlockNeedsLayout = !1),
    re(function () {
      var e, t, n, a;
      (n = he.getElementsByTagName("body")[0]),
        n &&
          n.style &&
          ((t = he.createElement("div")),
          (a = he.createElement("div")),
          (a.style.cssText =
            "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
          n.appendChild(a).appendChild(t),
          typeof t.style.zoom !== xe &&
            ((t.style.cssText =
              "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"),
            (ne.inlineBlockNeedsLayout = e = 3 === t.offsetWidth),
            e && (n.style.zoom = 1)),
          n.removeChild(a));
    }),
    (function () {
      var e = he.createElement("div");
      if (null == ne.deleteExpando) {
        ne.deleteExpando = !0;
        try {
          delete e.test;
        } catch (t) {
          ne.deleteExpando = !1;
        }
      }
      e = null;
    })(),
    (re.acceptData = function (e) {
      var t = re.noData[(e.nodeName + " ").toLowerCase()],
        n = +e.nodeType || 1;
      return (
        (1 === n || 9 === n) &&
        (!t || (t !== !0 && e.getAttribute("classid") === t))
      );
    });
  var Te = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
    ke = /([A-Z])/g;
  re.extend({
    cache: {},
    noData: {
      "applet ": !0,
      "embed ": !0,
      "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
    },
    hasData: function (e) {
      return (
        (e = e.nodeType ? re.cache[e[re.expando]] : e[re.expando]), !!e && !d(e)
      );
    },
    data: function (e, t, n) {
      return c(e, t, n);
    },
    removeData: function (e, t) {
      return u(e, t);
    },
    _data: function (e, t, n) {
      return c(e, t, n, !0);
    },
    _removeData: function (e, t) {
      return u(e, t, !0);
    },
  }),
    re.fn.extend({
      data: function (e, t) {
        var n,
          a,
          r,
          o = this[0],
          i = o && o.attributes;
        if (void 0 === e) {
          if (
            this.length &&
            ((r = re.data(o)), 1 === o.nodeType && !re._data(o, "parsedAttrs"))
          ) {
            for (n = i.length; n--; )
              i[n] &&
                ((a = i[n].name),
                0 === a.indexOf("data-") &&
                  ((a = re.camelCase(a.slice(5))), l(o, a, r[a])));
            re._data(o, "parsedAttrs", !0);
          }
          return r;
        }
        return "object" == typeof e
          ? this.each(function () {
              re.data(this, e);
            })
          : arguments.length > 1
          ? this.each(function () {
              re.data(this, e, t);
            })
          : o
          ? l(o, e, re.data(o, e))
          : void 0;
      },
      removeData: function (e) {
        return this.each(function () {
          re.removeData(this, e);
        });
      },
    }),
    re.extend({
      queue: function (e, t, n) {
        var a;
        return e
          ? ((t = (t || "fx") + "queue"),
            (a = re._data(e, t)),
            n &&
              (!a || re.isArray(n)
                ? (a = re._data(e, t, re.makeArray(n)))
                : a.push(n)),
            a || [])
          : void 0;
      },
      dequeue: function (e, t) {
        t = t || "fx";
        var n = re.queue(e, t),
          a = n.length,
          r = n.shift(),
          o = re._queueHooks(e, t),
          i = function () {
            re.dequeue(e, t);
          };
        "inprogress" === r && ((r = n.shift()), a--),
          r &&
            ("fx" === t && n.unshift("inprogress"),
            delete o.stop,
            r.call(e, i, o)),
          !a && o && o.empty.fire();
      },
      _queueHooks: function (e, t) {
        var n = t + "queueHooks";
        return (
          re._data(e, n) ||
          re._data(e, n, {
            empty: re.Callbacks("once memory").add(function () {
              re._removeData(e, t + "queue"), re._removeData(e, n);
            }),
          })
        );
      },
    }),
    re.fn.extend({
      queue: function (e, t) {
        var n = 2;
        return (
          "string" != typeof e && ((t = e), (e = "fx"), n--),
          arguments.length < n
            ? re.queue(this[0], e)
            : void 0 === t
            ? this
            : this.each(function () {
                var n = re.queue(this, e, t);
                re._queueHooks(this, e),
                  "fx" === e && "inprogress" !== n[0] && re.dequeue(this, e);
              })
        );
      },
      dequeue: function (e) {
        return this.each(function () {
          re.dequeue(this, e);
        });
      },
      clearQueue: function (e) {
        return this.queue(e || "fx", []);
      },
      promise: function (e, t) {
        var n,
          a = 1,
          r = re.Deferred(),
          o = this,
          i = this.length,
          s = function () {
            --a || r.resolveWith(o, [o]);
          };
        for (
          "string" != typeof e && ((t = e), (e = void 0)), e = e || "fx";
          i--;

        )
          (n = re._data(o[i], e + "queueHooks")),
            n && n.empty && (a++, n.empty.add(s));
        return s(), r.promise(t);
      },
    });
  var Se = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
    Ie = ["Top", "Right", "Bottom", "Left"],
    De = function (e, t) {
      return (
        (e = t || e),
        "none" === re.css(e, "display") || !re.contains(e.ownerDocument, e)
      );
    },
    Ee = (re.access = function (e, t, n, a, r, o, i) {
      var s = 0,
        l = e.length,
        d = null == n;
      if ("object" === re.type(n)) {
        r = !0;
        for (s in n) re.access(e, t, s, n[s], !0, o, i);
      } else if (
        void 0 !== a &&
        ((r = !0),
        re.isFunction(a) || (i = !0),
        d &&
          (i
            ? (t.call(e, a), (t = null))
            : ((d = t),
              (t = function (e, t, n) {
                return d.call(re(e), n);
              }))),
        t)
      )
        for (; l > s; s++) t(e[s], n, i ? a : a.call(e[s], s, t(e[s], n)));
      return r ? e : d ? t.call(e) : l ? t(e[0], n) : o;
    }),
    Fe = /^(?:checkbox|radio)$/i;
  !(function () {
    var e = he.createElement("input"),
      t = he.createElement("div"),
      n = he.createDocumentFragment();
    if (
      ((t.innerHTML =
        "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
      (ne.leadingWhitespace = 3 === t.firstChild.nodeType),
      (ne.tbody = !t.getElementsByTagName("tbody").length),
      (ne.htmlSerialize = !!t.getElementsByTagName("link").length),
      (ne.html5Clone =
        "<:nav></:nav>" !== he.createElement("nav").cloneNode(!0).outerHTML),
      (e.type = "checkbox"),
      (e.checked = !0),
      n.appendChild(e),
      (ne.appendChecked = e.checked),
      (t.innerHTML = "<textarea>x</textarea>"),
      (ne.noCloneChecked = !!t.cloneNode(!0).lastChild.defaultValue),
      n.appendChild(t),
      (t.innerHTML = "<input type='radio' checked='checked' name='t'/>"),
      (ne.checkClone = t.cloneNode(!0).cloneNode(!0).lastChild.checked),
      (ne.noCloneEvent = !0),
      t.attachEvent &&
        (t.attachEvent("onclick", function () {
          ne.noCloneEvent = !1;
        }),
        t.cloneNode(!0).click()),
      null == ne.deleteExpando)
    ) {
      ne.deleteExpando = !0;
      try {
        delete t.test;
      } catch (a) {
        ne.deleteExpando = !1;
      }
    }
  })(),
    (function () {
      var t,
        n,
        a = he.createElement("div");
      for (t in { submit: !0, change: !0, focusin: !0 })
        (n = "on" + t),
          (ne[t + "Bubbles"] = n in e) ||
            (a.setAttribute(n, "t"),
            (ne[t + "Bubbles"] = a.attributes[n].expando === !1));
      a = null;
    })();
  var Me = /^(?:input|select|textarea)$/i,
    Ae = /^key/,
    Ne = /^(?:mouse|pointer|contextmenu)|click/,
    Pe = /^(?:focusinfocus|focusoutblur)$/,
    _e = /^([^.]*)(?:\.(.+)|)$/;
  (re.event = {
    global: {},
    add: function (e, t, n, a, r) {
      var o,
        i,
        s,
        l,
        d,
        c,
        u,
        p,
        f,
        h,
        m,
        v = re._data(e);
      if (v) {
        for (
          n.handler && ((l = n), (n = l.handler), (r = l.selector)),
            n.guid || (n.guid = re.guid++),
            (i = v.events) || (i = v.events = {}),
            (c = v.handle) ||
              ((c = v.handle =
                function (e) {
                  return typeof re === xe ||
                    (e && re.event.triggered === e.type)
                    ? void 0
                    : re.event.dispatch.apply(c.elem, arguments);
                }),
              (c.elem = e)),
            t = (t || "").match($e) || [""],
            s = t.length;
          s--;

        )
          (o = _e.exec(t[s]) || []),
            (f = m = o[1]),
            (h = (o[2] || "").split(".").sort()),
            f &&
              ((d = re.event.special[f] || {}),
              (f = (r ? d.delegateType : d.bindType) || f),
              (d = re.event.special[f] || {}),
              (u = re.extend(
                {
                  type: f,
                  origType: m,
                  data: a,
                  handler: n,
                  guid: n.guid,
                  selector: r,
                  needsContext: r && re.expr.match.needsContext.test(r),
                  namespace: h.join("."),
                },
                l
              )),
              (p = i[f]) ||
                ((p = i[f] = []),
                (p.delegateCount = 0),
                (d.setup && d.setup.call(e, a, h, c) !== !1) ||
                  (e.addEventListener
                    ? e.addEventListener(f, c, !1)
                    : e.attachEvent && e.attachEvent("on" + f, c))),
              d.add &&
                (d.add.call(e, u), u.handler.guid || (u.handler.guid = n.guid)),
              r ? p.splice(p.delegateCount++, 0, u) : p.push(u),
              (re.event.global[f] = !0));
        e = null;
      }
    },
    remove: function (e, t, n, a, r) {
      var o,
        i,
        s,
        l,
        d,
        c,
        u,
        p,
        f,
        h,
        m,
        v = re.hasData(e) && re._data(e);
      if (v && (c = v.events)) {
        for (t = (t || "").match($e) || [""], d = t.length; d--; )
          if (
            ((s = _e.exec(t[d]) || []),
            (f = m = s[1]),
            (h = (s[2] || "").split(".").sort()),
            f)
          ) {
            for (
              u = re.event.special[f] || {},
                f = (a ? u.delegateType : u.bindType) || f,
                p = c[f] || [],
                s =
                  s[2] &&
                  new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                l = o = p.length;
              o--;

            )
              (i = p[o]),
                (!r && m !== i.origType) ||
                  (n && n.guid !== i.guid) ||
                  (s && !s.test(i.namespace)) ||
                  (a && a !== i.selector && ("**" !== a || !i.selector)) ||
                  (p.splice(o, 1),
                  i.selector && p.delegateCount--,
                  u.remove && u.remove.call(e, i));
            l &&
              !p.length &&
              ((u.teardown && u.teardown.call(e, h, v.handle) !== !1) ||
                re.removeEvent(e, f, v.handle),
              delete c[f]);
          } else for (f in c) re.event.remove(e, f + t[d], n, a, !0);
        re.isEmptyObject(c) && (delete v.handle, re._removeData(e, "events"));
      }
    },
    trigger: function (t, n, a, r) {
      var o,
        i,
        s,
        l,
        d,
        c,
        u,
        p = [a || he],
        f = te.call(t, "type") ? t.type : t,
        h = te.call(t, "namespace") ? t.namespace.split(".") : [];
      if (
        ((s = c = a = a || he),
        3 !== a.nodeType &&
          8 !== a.nodeType &&
          !Pe.test(f + re.event.triggered) &&
          (f.indexOf(".") >= 0 &&
            ((h = f.split(".")), (f = h.shift()), h.sort()),
          (i = f.indexOf(":") < 0 && "on" + f),
          (t = t[re.expando] ? t : new re.Event(f, "object" == typeof t && t)),
          (t.isTrigger = r ? 2 : 3),
          (t.namespace = h.join(".")),
          (t.namespace_re = t.namespace
            ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)")
            : null),
          (t.result = void 0),
          t.target || (t.target = a),
          (n = null == n ? [t] : re.makeArray(n, [t])),
          (d = re.event.special[f] || {}),
          r || !d.trigger || d.trigger.apply(a, n) !== !1))
      ) {
        if (!r && !d.noBubble && !re.isWindow(a)) {
          for (
            l = d.delegateType || f, Pe.test(l + f) || (s = s.parentNode);
            s;
            s = s.parentNode
          )
            p.push(s), (c = s);
          c === (a.ownerDocument || he) &&
            p.push(c.defaultView || c.parentWindow || e);
        }
        for (u = 0; (s = p[u++]) && !t.isPropagationStopped(); )
          (t.type = u > 1 ? l : d.bindType || f),
            (o =
              (re._data(s, "events") || {})[t.type] && re._data(s, "handle")),
            o && o.apply(s, n),
            (o = i && s[i]),
            o &&
              o.apply &&
              re.acceptData(s) &&
              ((t.result = o.apply(s, n)),
              t.result === !1 && t.preventDefault());
        if (
          ((t.type = f),
          !r &&
            !t.isDefaultPrevented() &&
            (!d._default || d._default.apply(p.pop(), n) === !1) &&
            re.acceptData(a) &&
            i &&
            a[f] &&
            !re.isWindow(a))
        ) {
          (c = a[i]), c && (a[i] = null), (re.event.triggered = f);
          try {
            a[f]();
          } catch (m) {}
          (re.event.triggered = void 0), c && (a[i] = c);
        }
        return t.result;
      }
    },
    dispatch: function (e) {
      e = re.event.fix(e);
      var t,
        n,
        a,
        r,
        o,
        i = [],
        s = Q.call(arguments),
        l = (re._data(this, "events") || {})[e.type] || [],
        d = re.event.special[e.type] || {};
      if (
        ((s[0] = e),
        (e.delegateTarget = this),
        !d.preDispatch || d.preDispatch.call(this, e) !== !1)
      ) {
        for (
          i = re.event.handlers.call(this, e, l), t = 0;
          (r = i[t++]) && !e.isPropagationStopped();

        )
          for (
            e.currentTarget = r.elem, o = 0;
            (a = r.handlers[o++]) && !e.isImmediatePropagationStopped();

          )
            (!e.namespace_re || e.namespace_re.test(a.namespace)) &&
              ((e.handleObj = a),
              (e.data = a.data),
              (n = (
                (re.event.special[a.origType] || {}).handle || a.handler
              ).apply(r.elem, s)),
              void 0 !== n &&
                (e.result = n) === !1 &&
                (e.preventDefault(), e.stopPropagation()));
        return d.postDispatch && d.postDispatch.call(this, e), e.result;
      }
    },
    handlers: function (e, t) {
      var n,
        a,
        r,
        o,
        i = [],
        s = t.delegateCount,
        l = e.target;
      if (s && l.nodeType && (!e.button || "click" !== e.type))
        for (; l != this; l = l.parentNode || this)
          if (1 === l.nodeType && (l.disabled !== !0 || "click" !== e.type)) {
            for (r = [], o = 0; s > o; o++)
              (a = t[o]),
                (n = a.selector + " "),
                void 0 === r[n] &&
                  (r[n] = a.needsContext
                    ? re(n, this).index(l) >= 0
                    : re.find(n, this, null, [l]).length),
                r[n] && r.push(a);
            r.length && i.push({ elem: l, handlers: r });
          }
      return s < t.length && i.push({ elem: this, handlers: t.slice(s) }), i;
    },
    fix: function (e) {
      if (e[re.expando]) return e;
      var t,
        n,
        a,
        r = e.type,
        o = e,
        i = this.fixHooks[r];
      for (
        i ||
          (this.fixHooks[r] = i =
            Ne.test(r) ? this.mouseHooks : Ae.test(r) ? this.keyHooks : {}),
          a = i.props ? this.props.concat(i.props) : this.props,
          e = new re.Event(o),
          t = a.length;
        t--;

      )
        (n = a[t]), (e[n] = o[n]);
      return (
        e.target || (e.target = o.srcElement || he),
        3 === e.target.nodeType && (e.target = e.target.parentNode),
        (e.metaKey = !!e.metaKey),
        i.filter ? i.filter(e, o) : e
      );
    },
    props:
      "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
        " "
      ),
    fixHooks: {},
    keyHooks: {
      props: "char charCode key keyCode".split(" "),
      filter: function (e, t) {
        return (
          null == e.which &&
            (e.which = null != t.charCode ? t.charCode : t.keyCode),
          e
        );
      },
    },
    mouseHooks: {
      props:
        "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
          " "
        ),
      filter: function (e, t) {
        var n,
          a,
          r,
          o = t.button,
          i = t.fromElement;
        return (
          null == e.pageX &&
            null != t.clientX &&
            ((a = e.target.ownerDocument || he),
            (r = a.documentElement),
            (n = a.body),
            (e.pageX =
              t.clientX +
              ((r && r.scrollLeft) || (n && n.scrollLeft) || 0) -
              ((r && r.clientLeft) || (n && n.clientLeft) || 0)),
            (e.pageY =
              t.clientY +
              ((r && r.scrollTop) || (n && n.scrollTop) || 0) -
              ((r && r.clientTop) || (n && n.clientTop) || 0))),
          !e.relatedTarget &&
            i &&
            (e.relatedTarget = i === e.target ? t.toElement : i),
          e.which ||
            void 0 === o ||
            (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
          e
        );
      },
    },
    special: {
      load: { noBubble: !0 },
      focus: {
        trigger: function () {
          if (this !== h() && this.focus)
            try {
              return this.focus(), !1;
            } catch (e) {}
        },
        delegateType: "focusin",
      },
      blur: {
        trigger: function () {
          return this === h() && this.blur ? (this.blur(), !1) : void 0;
        },
        delegateType: "focusout",
      },
      click: {
        trigger: function () {
          return re.nodeName(this, "input") &&
            "checkbox" === this.type &&
            this.click
            ? (this.click(), !1)
            : void 0;
        },
        _default: function (e) {
          return re.nodeName(e.target, "a");
        },
      },
      beforeunload: {
        postDispatch: function (e) {
          void 0 !== e.result &&
            e.originalEvent &&
            (e.originalEvent.returnValue = e.result);
        },
      },
    },
    simulate: function (e, t, n, a) {
      var r = re.extend(new re.Event(), n, {
        type: e,
        isSimulated: !0,
        originalEvent: {},
      });
      a ? re.event.trigger(r, null, t) : re.event.dispatch.call(t, r),
        r.isDefaultPrevented() && n.preventDefault();
    },
  }),
    (re.removeEvent = he.removeEventListener
      ? function (e, t, n) {
          e.removeEventListener && e.removeEventListener(t, n, !1);
        }
      : function (e, t, n) {
          var a = "on" + t;
          e.detachEvent &&
            (typeof e[a] === xe && (e[a] = null), e.detachEvent(a, n));
        }),
    (re.Event = function (e, t) {
      return this instanceof re.Event
        ? (e && e.type
            ? ((this.originalEvent = e),
              (this.type = e.type),
              (this.isDefaultPrevented =
                e.defaultPrevented ||
                (void 0 === e.defaultPrevented && e.returnValue === !1)
                  ? p
                  : f))
            : (this.type = e),
          t && re.extend(this, t),
          (this.timeStamp = (e && e.timeStamp) || re.now()),
          void (this[re.expando] = !0))
        : new re.Event(e, t);
    }),
    (re.Event.prototype = {
      isDefaultPrevented: f,
      isPropagationStopped: f,
      isImmediatePropagationStopped: f,
      preventDefault: function () {
        var e = this.originalEvent;
        (this.isDefaultPrevented = p),
          e && (e.preventDefault ? e.preventDefault() : (e.returnValue = !1));
      },
      stopPropagation: function () {
        var e = this.originalEvent;
        (this.isPropagationStopped = p),
          e &&
            (e.stopPropagation && e.stopPropagation(), (e.cancelBubble = !0));
      },
      stopImmediatePropagation: function () {
        var e = this.originalEvent;
        (this.isImmediatePropagationStopped = p),
          e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
          this.stopPropagation();
      },
    }),
    re.each(
      {
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout",
      },
      function (e, t) {
        re.event.special[e] = {
          delegateType: t,
          bindType: t,
          handle: function (e) {
            var n,
              a = this,
              r = e.relatedTarget,
              o = e.handleObj;
            return (
              (!r || (r !== a && !re.contains(a, r))) &&
                ((e.type = o.origType),
                (n = o.handler.apply(this, arguments)),
                (e.type = t)),
              n
            );
          },
        };
      }
    ),
    ne.submitBubbles ||
      (re.event.special.submit = {
        setup: function () {
          return (
            !re.nodeName(this, "form") &&
            void re.event.add(
              this,
              "click._submit keypress._submit",
              function (e) {
                var t = e.target,
                  n =
                    re.nodeName(t, "input") || re.nodeName(t, "button")
                      ? t.form
                      : void 0;
                n &&
                  !re._data(n, "submitBubbles") &&
                  (re.event.add(n, "submit._submit", function (e) {
                    e._submit_bubble = !0;
                  }),
                  re._data(n, "submitBubbles", !0));
              }
            )
          );
        },
        postDispatch: function (e) {
          e._submit_bubble &&
            (delete e._submit_bubble,
            this.parentNode &&
              !e.isTrigger &&
              re.event.simulate("submit", this.parentNode, e, !0));
        },
        teardown: function () {
          return (
            !re.nodeName(this, "form") && void re.event.remove(this, "._submit")
          );
        },
      }),
    ne.changeBubbles ||
      (re.event.special.change = {
        setup: function () {
          return Me.test(this.nodeName)
            ? (("checkbox" === this.type || "radio" === this.type) &&
                (re.event.add(this, "propertychange._change", function (e) {
                  "checked" === e.originalEvent.propertyName &&
                    (this._just_changed = !0);
                }),
                re.event.add(this, "click._change", function (e) {
                  this._just_changed &&
                    !e.isTrigger &&
                    (this._just_changed = !1),
                    re.event.simulate("change", this, e, !0);
                })),
              !1)
            : void re.event.add(this, "beforeactivate._change", function (e) {
                var t = e.target;
                Me.test(t.nodeName) &&
                  !re._data(t, "changeBubbles") &&
                  (re.event.add(t, "change._change", function (e) {
                    !this.parentNode ||
                      e.isSimulated ||
                      e.isTrigger ||
                      re.event.simulate("change", this.parentNode, e, !0);
                  }),
                  re._data(t, "changeBubbles", !0));
              });
        },
        handle: function (e) {
          var t = e.target;
          return this !== t ||
            e.isSimulated ||
            e.isTrigger ||
            ("radio" !== t.type && "checkbox" !== t.type)
            ? e.handleObj.handler.apply(this, arguments)
            : void 0;
        },
        teardown: function () {
          return re.event.remove(this, "._change"), !Me.test(this.nodeName);
        },
      }),
    ne.focusinBubbles ||
      re.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
        var n = function (e) {
          re.event.simulate(t, e.target, re.event.fix(e), !0);
        };
        re.event.special[t] = {
          setup: function () {
            var a = this.ownerDocument || this,
              r = re._data(a, t);
            r || a.addEventListener(e, n, !0), re._data(a, t, (r || 0) + 1);
          },
          teardown: function () {
            var a = this.ownerDocument || this,
              r = re._data(a, t) - 1;
            r
              ? re._data(a, t, r)
              : (a.removeEventListener(e, n, !0), re._removeData(a, t));
          },
        };
      }),
    re.fn.extend({
      on: function (e, t, n, a, r) {
        var o, i;
        if ("object" == typeof e) {
          "string" != typeof t && ((n = n || t), (t = void 0));
          for (o in e) this.on(o, t, n, e[o], r);
          return this;
        }
        if (
          (null == n && null == a
            ? ((a = t), (n = t = void 0))
            : null == a &&
              ("string" == typeof t
                ? ((a = n), (n = void 0))
                : ((a = n), (n = t), (t = void 0))),
          a === !1)
        )
          a = f;
        else if (!a) return this;
        return (
          1 === r &&
            ((i = a),
            (a = function (e) {
              return re().off(e), i.apply(this, arguments);
            }),
            (a.guid = i.guid || (i.guid = re.guid++))),
          this.each(function () {
            re.event.add(this, e, a, n, t);
          })
        );
      },
      one: function (e, t, n, a) {
        return this.on(e, t, n, a, 1);
      },
      off: function (e, t, n) {
        var a, r;
        if (e && e.preventDefault && e.handleObj)
          return (
            (a = e.handleObj),
            re(e.delegateTarget).off(
              a.namespace ? a.origType + "." + a.namespace : a.origType,
              a.selector,
              a.handler
            ),
            this
          );
        if ("object" == typeof e) {
          for (r in e) this.off(r, t, e[r]);
          return this;
        }
        return (
          (t === !1 || "function" == typeof t) && ((n = t), (t = void 0)),
          n === !1 && (n = f),
          this.each(function () {
            re.event.remove(this, e, n, t);
          })
        );
      },
      trigger: function (e, t) {
        return this.each(function () {
          re.event.trigger(e, t, this);
        });
      },
      triggerHandler: function (e, t) {
        var n = this[0];
        return n ? re.event.trigger(e, t, n, !0) : void 0;
      },
    });
  var je =
      "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
    Le = / jQuery\d+="(?:null|\d+)"/g,
    Oe = new RegExp("<(?:" + je + ")[\\s/>]", "i"),
    He = /^\s+/,
    Be =
      /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
    Re = /<([\w:]+)/,
    qe = /<tbody/i,
    We = /<|&#?\w+;/,
    Ve = /<(?:script|style|link)/i,
    ze = /checked\s*(?:[^=]|=\s*.checked.)/i,
    Ye = /^$|\/(?:java|ecma)script/i,
    Ue = /^true\/(.*)/,
    Xe = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
    Qe = {
      option: [1, "<select multiple='multiple'>", "</select>"],
      legend: [1, "<fieldset>", "</fieldset>"],
      area: [1, "<map>", "</map>"],
      param: [1, "<object>", "</object>"],
      thead: [1, "<table>", "</table>"],
      tr: [2, "<table><tbody>", "</tbody></table>"],
      col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
      td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
      _default: ne.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
    },
    Ke = m(he),
    Je = Ke.appendChild(he.createElement("div"));
  (Qe.optgroup = Qe.option),
    (Qe.tbody = Qe.tfoot = Qe.colgroup = Qe.caption = Qe.thead),
    (Qe.th = Qe.td),
    re.extend({
      clone: function (e, t, n) {
        var a,
          r,
          o,
          i,
          s,
          l = re.contains(e.ownerDocument, e);
        if (
          (ne.html5Clone || re.isXMLDoc(e) || !Oe.test("<" + e.nodeName + ">")
            ? (o = e.cloneNode(!0))
            : ((Je.innerHTML = e.outerHTML),
              Je.removeChild((o = Je.firstChild))),
          !(
            (ne.noCloneEvent && ne.noCloneChecked) ||
            (1 !== e.nodeType && 11 !== e.nodeType) ||
            re.isXMLDoc(e)
          ))
        )
          for (a = v(o), s = v(e), i = 0; null != (r = s[i]); ++i)
            a[i] && x(r, a[i]);
        if (t)
          if (n)
            for (s = s || v(e), a = a || v(o), i = 0; null != (r = s[i]); i++)
              w(r, a[i]);
          else w(e, o);
        return (
          (a = v(o, "script")),
          a.length > 0 && C(a, !l && v(e, "script")),
          (a = s = r = null),
          o
        );
      },
      buildFragment: function (e, t, n, a) {
        for (
          var r, o, i, s, l, d, c, u = e.length, p = m(t), f = [], h = 0;
          u > h;
          h++
        )
          if (((o = e[h]), o || 0 === o))
            if ("object" === re.type(o)) re.merge(f, o.nodeType ? [o] : o);
            else if (We.test(o)) {
              for (
                s = s || p.appendChild(t.createElement("div")),
                  l = (Re.exec(o) || ["", ""])[1].toLowerCase(),
                  c = Qe[l] || Qe._default,
                  s.innerHTML = c[1] + o.replace(Be, "<$1></$2>") + c[2],
                  r = c[0];
                r--;

              )
                s = s.lastChild;
              if (
                (!ne.leadingWhitespace &&
                  He.test(o) &&
                  f.push(t.createTextNode(He.exec(o)[0])),
                !ne.tbody)
              )
                for (
                  o =
                    "table" !== l || qe.test(o)
                      ? "<table>" !== c[1] || qe.test(o)
                        ? 0
                        : s
                      : s.firstChild,
                    r = o && o.childNodes.length;
                  r--;

                )
                  re.nodeName((d = o.childNodes[r]), "tbody") &&
                    !d.childNodes.length &&
                    o.removeChild(d);
              for (
                re.merge(f, s.childNodes), s.textContent = "";
                s.firstChild;

              )
                s.removeChild(s.firstChild);
              s = p.lastChild;
            } else f.push(t.createTextNode(o));
        for (
          s && p.removeChild(s),
            ne.appendChecked || re.grep(v(f, "input"), g),
            h = 0;
          (o = f[h++]);

        )
          if (
            (!a || -1 === re.inArray(o, a)) &&
            ((i = re.contains(o.ownerDocument, o)),
            (s = v(p.appendChild(o), "script")),
            i && C(s),
            n)
          )
            for (r = 0; (o = s[r++]); ) Ye.test(o.type || "") && n.push(o);
        return (s = null), p;
      },
      cleanData: function (e, t) {
        for (
          var n,
            a,
            r,
            o,
            i = 0,
            s = re.expando,
            l = re.cache,
            d = ne.deleteExpando,
            c = re.event.special;
          null != (n = e[i]);
          i++
        )
          if ((t || re.acceptData(n)) && ((r = n[s]), (o = r && l[r]))) {
            if (o.events)
              for (a in o.events)
                c[a] ? re.event.remove(n, a) : re.removeEvent(n, a, o.handle);
            l[r] &&
              (delete l[r],
              d
                ? delete n[s]
                : typeof n.removeAttribute !== xe
                ? n.removeAttribute(s)
                : (n[s] = null),
              X.push(r));
          }
      },
    }),
    re.fn.extend({
      text: function (e) {
        return Ee(
          this,
          function (e) {
            return void 0 === e
              ? re.text(this)
              : this.empty().append(
                  ((this[0] && this[0].ownerDocument) || he).createTextNode(e)
                );
          },
          null,
          e,
          arguments.length
        );
      },
      append: function () {
        return this.domManip(arguments, function (e) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var t = y(this, e);
            t.appendChild(e);
          }
        });
      },
      prepend: function () {
        return this.domManip(arguments, function (e) {
          if (
            1 === this.nodeType ||
            11 === this.nodeType ||
            9 === this.nodeType
          ) {
            var t = y(this, e);
            t.insertBefore(e, t.firstChild);
          }
        });
      },
      before: function () {
        return this.domManip(arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this);
        });
      },
      after: function () {
        return this.domManip(arguments, function (e) {
          this.parentNode && this.parentNode.insertBefore(e, this.nextSibling);
        });
      },
      remove: function (e, t) {
        for (
          var n, a = e ? re.filter(e, this) : this, r = 0;
          null != (n = a[r]);
          r++
        )
          t || 1 !== n.nodeType || re.cleanData(v(n)),
            n.parentNode &&
              (t && re.contains(n.ownerDocument, n) && C(v(n, "script")),
              n.parentNode.removeChild(n));
        return this;
      },
      empty: function () {
        for (var e, t = 0; null != (e = this[t]); t++) {
          for (1 === e.nodeType && re.cleanData(v(e, !1)); e.firstChild; )
            e.removeChild(e.firstChild);
          e.options && re.nodeName(e, "select") && (e.options.length = 0);
        }
        return this;
      },
      clone: function (e, t) {
        return (
          (e = null != e && e),
          (t = null == t ? e : t),
          this.map(function () {
            return re.clone(this, e, t);
          })
        );
      },
      html: function (e) {
        return Ee(
          this,
          function (e) {
            var t = this[0] || {},
              n = 0,
              a = this.length;
            if (void 0 === e)
              return 1 === t.nodeType ? t.innerHTML.replace(Le, "") : void 0;
            if (
              !(
                "string" != typeof e ||
                Ve.test(e) ||
                (!ne.htmlSerialize && Oe.test(e)) ||
                (!ne.leadingWhitespace && He.test(e)) ||
                Qe[(Re.exec(e) || ["", ""])[1].toLowerCase()]
              )
            ) {
              e = e.replace(Be, "<$1></$2>");
              try {
                for (; a > n; n++)
                  (t = this[n] || {}),
                    1 === t.nodeType &&
                      (re.cleanData(v(t, !1)), (t.innerHTML = e));
                t = 0;
              } catch (r) {}
            }
            t && this.empty().append(e);
          },
          null,
          e,
          arguments.length
        );
      },
      replaceWith: function () {
        var e = arguments[0];
        return (
          this.domManip(arguments, function (t) {
            (e = this.parentNode),
              re.cleanData(v(this)),
              e && e.replaceChild(t, this);
          }),
          e && (e.length || e.nodeType) ? this : this.remove()
        );
      },
      detach: function (e) {
        return this.remove(e, !0);
      },
      domManip: function (e, t) {
        e = K.apply([], e);
        var n,
          a,
          r,
          o,
          i,
          s,
          l = 0,
          d = this.length,
          c = this,
          u = d - 1,
          p = e[0],
          f = re.isFunction(p);
        if (
          f ||
          (d > 1 && "string" == typeof p && !ne.checkClone && ze.test(p))
        )
          return this.each(function (n) {
            var a = c.eq(n);
            f && (e[0] = p.call(this, n, a.html())), a.domManip(e, t);
          });
        if (
          d &&
          ((s = re.buildFragment(e, this[0].ownerDocument, !1, this)),
          (n = s.firstChild),
          1 === s.childNodes.length && (s = n),
          n)
        ) {
          for (o = re.map(v(s, "script"), $), r = o.length; d > l; l++)
            (a = s),
              l !== u &&
                ((a = re.clone(a, !0, !0)), r && re.merge(o, v(a, "script"))),
              t.call(this[l], a, l);
          if (r)
            for (
              i = o[o.length - 1].ownerDocument, re.map(o, b), l = 0;
              r > l;
              l++
            )
              (a = o[l]),
                Ye.test(a.type || "") &&
                  !re._data(a, "globalEval") &&
                  re.contains(i, a) &&
                  (a.src
                    ? re._evalUrl && re._evalUrl(a.src)
                    : re.globalEval(
                        (a.text || a.textContent || a.innerHTML || "").replace(
                          Xe,
                          ""
                        )
                      ));
          s = n = null;
        }
        return this;
      },
    }),
    re.each(
      {
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith",
      },
      function (e, t) {
        re.fn[e] = function (e) {
          for (var n, a = 0, r = [], o = re(e), i = o.length - 1; i >= a; a++)
            (n = a === i ? this : this.clone(!0)),
              re(o[a])[t](n),
              J.apply(r, n.get());
          return this.pushStack(r);
        };
      }
    );
  var Ge,
    Ze = {};
  !(function () {
    var e;
    ne.shrinkWrapBlocks = function () {
      if (null != e) return e;
      e = !1;
      var t, n, a;
      return (
        (n = he.getElementsByTagName("body")[0]),
        n && n.style
          ? ((t = he.createElement("div")),
            (a = he.createElement("div")),
            (a.style.cssText =
              "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
            n.appendChild(a).appendChild(t),
            typeof t.style.zoom !== xe &&
              ((t.style.cssText =
                "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
              (t.appendChild(he.createElement("div")).style.width = "5px"),
              (e = 3 !== t.offsetWidth)),
            n.removeChild(a),
            e)
          : void 0
      );
    };
  })();
  var et,
    tt,
    nt = /^margin/,
    at = new RegExp("^(" + Se + ")(?!px)[a-z%]+$", "i"),
    rt = /^(top|right|bottom|left)$/;
  e.getComputedStyle
    ? ((et = function (e) {
        return e.ownerDocument.defaultView.getComputedStyle(e, null);
      }),
      (tt = function (e, t, n) {
        var a,
          r,
          o,
          i,
          s = e.style;
        return (
          (n = n || et(e)),
          (i = n ? n.getPropertyValue(t) || n[t] : void 0),
          n &&
            ("" !== i ||
              re.contains(e.ownerDocument, e) ||
              (i = re.style(e, t)),
            at.test(i) &&
              nt.test(t) &&
              ((a = s.width),
              (r = s.minWidth),
              (o = s.maxWidth),
              (s.minWidth = s.maxWidth = s.width = i),
              (i = n.width),
              (s.width = a),
              (s.minWidth = r),
              (s.maxWidth = o))),
          void 0 === i ? i : i + ""
        );
      }))
    : he.documentElement.currentStyle &&
      ((et = function (e) {
        return e.currentStyle;
      }),
      (tt = function (e, t, n) {
        var a,
          r,
          o,
          i,
          s = e.style;
        return (
          (n = n || et(e)),
          (i = n ? n[t] : void 0),
          null == i && s && s[t] && (i = s[t]),
          at.test(i) &&
            !rt.test(t) &&
            ((a = s.left),
            (r = e.runtimeStyle),
            (o = r && r.left),
            o && (r.left = e.currentStyle.left),
            (s.left = "fontSize" === t ? "1em" : i),
            (i = s.pixelLeft + "px"),
            (s.left = a),
            o && (r.left = o)),
          void 0 === i ? i : i + "" || "auto"
        );
      })),
    !(function () {
      function t() {
        var t, n, a, r;
        (n = he.getElementsByTagName("body")[0]),
          n &&
            n.style &&
            ((t = he.createElement("div")),
            (a = he.createElement("div")),
            (a.style.cssText =
              "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
            n.appendChild(a).appendChild(t),
            (t.style.cssText =
              "-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute"),
            (o = i = !1),
            (l = !0),
            e.getComputedStyle &&
              ((o = "1%" !== (e.getComputedStyle(t, null) || {}).top),
              (i =
                "4px" ===
                (e.getComputedStyle(t, null) || { width: "4px" }).width),
              (r = t.appendChild(he.createElement("div"))),
              (r.style.cssText = t.style.cssText =
                "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
              (r.style.marginRight = r.style.width = "0"),
              (t.style.width = "1px"),
              (l = !parseFloat(
                (e.getComputedStyle(r, null) || {}).marginRight
              ))),
            (t.innerHTML = "<table><tr><td></td><td>t</td></tr></table>"),
            (r = t.getElementsByTagName("td")),
            (r[0].style.cssText = "margin:0;border:0;padding:0;display:none"),
            (s = 0 === r[0].offsetHeight),
            s &&
              ((r[0].style.display = ""),
              (r[1].style.display = "none"),
              (s = 0 === r[0].offsetHeight)),
            n.removeChild(a));
      }
      var n, a, r, o, i, s, l;
      (n = he.createElement("div")),
        (n.innerHTML =
          "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
        (r = n.getElementsByTagName("a")[0]),
        (a = r && r.style) &&
          ((a.cssText = "float:left;opacity:.5"),
          (ne.opacity = "0.5" === a.opacity),
          (ne.cssFloat = !!a.cssFloat),
          (n.style.backgroundClip = "content-box"),
          (n.cloneNode(!0).style.backgroundClip = ""),
          (ne.clearCloneStyle = "content-box" === n.style.backgroundClip),
          (ne.boxSizing =
            "" === a.boxSizing ||
            "" === a.MozBoxSizing ||
            "" === a.WebkitBoxSizing),
          re.extend(ne, {
            reliableHiddenOffsets: function () {
              return null == s && t(), s;
            },
            boxSizingReliable: function () {
              return null == i && t(), i;
            },
            pixelPosition: function () {
              return null == o && t(), o;
            },
            reliableMarginRight: function () {
              return null == l && t(), l;
            },
          }));
    })(),
    (re.swap = function (e, t, n, a) {
      var r,
        o,
        i = {};
      for (o in t) (i[o] = e.style[o]), (e.style[o] = t[o]);
      r = n.apply(e, a || []);
      for (o in t) e.style[o] = i[o];
      return r;
    });
  var ot = /alpha\([^)]*\)/i,
    it = /opacity\s*=\s*([^)]*)/,
    st = /^(none|table(?!-c[ea]).+)/,
    lt = new RegExp("^(" + Se + ")(.*)$", "i"),
    dt = new RegExp("^([+-])=(" + Se + ")", "i"),
    ct = { position: "absolute", visibility: "hidden", display: "block" },
    ut = { letterSpacing: "0", fontWeight: "400" },
    pt = ["Webkit", "O", "Moz", "ms"];
  re.extend({
    cssHooks: {
      opacity: {
        get: function (e, t) {
          if (t) {
            var n = tt(e, "opacity");
            return "" === n ? "1" : n;
          }
        },
      },
    },
    cssNumber: {
      columnCount: !0,
      fillOpacity: !0,
      flexGrow: !0,
      flexShrink: !0,
      fontWeight: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
    },
    cssProps: { float: ne.cssFloat ? "cssFloat" : "styleFloat" },
    style: function (e, t, n, a) {
      if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
        var r,
          o,
          i,
          s = re.camelCase(t),
          l = e.style;
        if (
          ((t = re.cssProps[s] || (re.cssProps[s] = I(l, s))),
          (i = re.cssHooks[t] || re.cssHooks[s]),
          void 0 === n)
        )
          return i && "get" in i && void 0 !== (r = i.get(e, !1, a)) ? r : l[t];
        if (
          ((o = typeof n),
          "string" === o &&
            (r = dt.exec(n)) &&
            ((n = (r[1] + 1) * r[2] + parseFloat(re.css(e, t))),
            (o = "number")),
          null != n &&
            n === n &&
            ("number" !== o || re.cssNumber[s] || (n += "px"),
            ne.clearCloneStyle ||
              "" !== n ||
              0 !== t.indexOf("background") ||
              (l[t] = "inherit"),
            !(i && "set" in i && void 0 === (n = i.set(e, n, a)))))
        )
          try {
            l[t] = n;
          } catch (d) {}
      }
    },
    css: function (e, t, n, a) {
      var r,
        o,
        i,
        s = re.camelCase(t);
      return (
        (t = re.cssProps[s] || (re.cssProps[s] = I(e.style, s))),
        (i = re.cssHooks[t] || re.cssHooks[s]),
        i && "get" in i && (o = i.get(e, !0, n)),
        void 0 === o && (o = tt(e, t, a)),
        "normal" === o && t in ut && (o = ut[t]),
        "" === n || n
          ? ((r = parseFloat(o)), n === !0 || re.isNumeric(r) ? r || 0 : o)
          : o
      );
    },
  }),
    re.each(["height", "width"], function (e, t) {
      re.cssHooks[t] = {
        get: function (e, n, a) {
          return n
            ? st.test(re.css(e, "display")) && 0 === e.offsetWidth
              ? re.swap(e, ct, function () {
                  return M(e, t, a);
                })
              : M(e, t, a)
            : void 0;
        },
        set: function (e, n, a) {
          var r = a && et(e);
          return E(
            e,
            n,
            a
              ? F(
                  e,
                  t,
                  a,
                  ne.boxSizing &&
                    "border-box" === re.css(e, "boxSizing", !1, r),
                  r
                )
              : 0
          );
        },
      };
    }),
    ne.opacity ||
      (re.cssHooks.opacity = {
        get: function (e, t) {
          return it.test(
            (t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || ""
          )
            ? 0.01 * parseFloat(RegExp.$1) + ""
            : t
            ? "1"
            : "";
        },
        set: function (e, t) {
          var n = e.style,
            a = e.currentStyle,
            r = re.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
            o = (a && a.filter) || n.filter || "";
          (n.zoom = 1),
            ((t >= 1 || "" === t) &&
              "" === re.trim(o.replace(ot, "")) &&
              n.removeAttribute &&
              (n.removeAttribute("filter"), "" === t || (a && !a.filter))) ||
              (n.filter = ot.test(o) ? o.replace(ot, r) : o + " " + r);
        },
      }),
    (re.cssHooks.marginRight = S(ne.reliableMarginRight, function (e, t) {
      return t
        ? re.swap(e, { display: "inline-block" }, tt, [e, "marginRight"])
        : void 0;
    })),
    re.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
      (re.cssHooks[e + t] = {
        expand: function (n) {
          for (
            var a = 0, r = {}, o = "string" == typeof n ? n.split(" ") : [n];
            4 > a;
            a++
          )
            r[e + Ie[a] + t] = o[a] || o[a - 2] || o[0];
          return r;
        },
      }),
        nt.test(e) || (re.cssHooks[e + t].set = E);
    }),
    re.fn.extend({
      css: function (e, t) {
        return Ee(
          this,
          function (e, t, n) {
            var a,
              r,
              o = {},
              i = 0;
            if (re.isArray(t)) {
              for (a = et(e), r = t.length; r > i; i++)
                o[t[i]] = re.css(e, t[i], !1, a);
              return o;
            }
            return void 0 !== n ? re.style(e, t, n) : re.css(e, t);
          },
          e,
          t,
          arguments.length > 1
        );
      },
      show: function () {
        return D(this, !0);
      },
      hide: function () {
        return D(this);
      },
      toggle: function (e) {
        return "boolean" == typeof e
          ? e
            ? this.show()
            : this.hide()
          : this.each(function () {
              De(this) ? re(this).show() : re(this).hide();
            });
      },
    }),
    (re.Tween = A),
    (A.prototype = {
      constructor: A,
      init: function (e, t, n, a, r, o) {
        (this.elem = e),
          (this.prop = n),
          (this.easing = r || "swing"),
          (this.options = t),
          (this.start = this.now = this.cur()),
          (this.end = a),
          (this.unit = o || (re.cssNumber[n] ? "" : "px"));
      },
      cur: function () {
        var e = A.propHooks[this.prop];
        return e && e.get ? e.get(this) : A.propHooks._default.get(this);
      },
      run: function (e) {
        var t,
          n = A.propHooks[this.prop];
        return (
          (this.pos = t =
            this.options.duration
              ? re.easing[this.easing](
                  e,
                  this.options.duration * e,
                  0,
                  1,
                  this.options.duration
                )
              : e),
          (this.now = (this.end - this.start) * t + this.start),
          this.options.step &&
            this.options.step.call(this.elem, this.now, this),
          n && n.set ? n.set(this) : A.propHooks._default.set(this),
          this
        );
      },
    }),
    (A.prototype.init.prototype = A.prototype),
    (A.propHooks = {
      _default: {
        get: function (e) {
          var t;
          return null == e.elem[e.prop] ||
            (e.elem.style && null != e.elem.style[e.prop])
            ? ((t = re.css(e.elem, e.prop, "")), t && "auto" !== t ? t : 0)
            : e.elem[e.prop];
        },
        set: function (e) {
          re.fx.step[e.prop]
            ? re.fx.step[e.prop](e)
            : e.elem.style &&
              (null != e.elem.style[re.cssProps[e.prop]] || re.cssHooks[e.prop])
            ? re.style(e.elem, e.prop, e.now + e.unit)
            : (e.elem[e.prop] = e.now);
        },
      },
    }),
    (A.propHooks.scrollTop = A.propHooks.scrollLeft =
      {
        set: function (e) {
          e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
        },
      }),
    (re.easing = {
      linear: function (e) {
        return e;
      },
      swing: function (e) {
        return 0.5 - Math.cos(e * Math.PI) / 2;
      },
    }),
    (re.fx = A.prototype.init),
    (re.fx.step = {});
  var ft,
    ht,
    mt = /^(?:toggle|show|hide)$/,
    vt = new RegExp("^(?:([+-])=|)(" + Se + ")([a-z%]*)$", "i"),
    gt = /queueHooks$/,
    yt = [j],
    $t = {
      "*": [
        function (e, t) {
          var n = this.createTween(e, t),
            a = n.cur(),
            r = vt.exec(t),
            o = (r && r[3]) || (re.cssNumber[e] ? "" : "px"),
            i =
              (re.cssNumber[e] || ("px" !== o && +a)) &&
              vt.exec(re.css(n.elem, e)),
            s = 1,
            l = 20;
          if (i && i[3] !== o) {
            (o = o || i[3]), (r = r || []), (i = +a || 1);
            do (s = s || ".5"), (i /= s), re.style(n.elem, e, i + o);
            while (s !== (s = n.cur() / a) && 1 !== s && --l);
          }
          return (
            r &&
              ((i = n.start = +i || +a || 0),
              (n.unit = o),
              (n.end = r[1] ? i + (r[1] + 1) * r[2] : +r[2])),
            n
          );
        },
      ],
    };
  (re.Animation = re.extend(O, {
    tweener: function (e, t) {
      re.isFunction(e) ? ((t = e), (e = ["*"])) : (e = e.split(" "));
      for (var n, a = 0, r = e.length; r > a; a++)
        (n = e[a]), ($t[n] = $t[n] || []), $t[n].unshift(t);
    },
    prefilter: function (e, t) {
      t ? yt.unshift(e) : yt.push(e);
    },
  })),
    (re.speed = function (e, t, n) {
      var a =
        e && "object" == typeof e
          ? re.extend({}, e)
          : {
              complete: n || (!n && t) || (re.isFunction(e) && e),
              duration: e,
              easing: (n && t) || (t && !re.isFunction(t) && t),
            };
      return (
        (a.duration = re.fx.off
          ? 0
          : "number" == typeof a.duration
          ? a.duration
          : a.duration in re.fx.speeds
          ? re.fx.speeds[a.duration]
          : re.fx.speeds._default),
        (null == a.queue || a.queue === !0) && (a.queue = "fx"),
        (a.old = a.complete),
        (a.complete = function () {
          re.isFunction(a.old) && a.old.call(this),
            a.queue && re.dequeue(this, a.queue);
        }),
        a
      );
    }),
    re.fn.extend({
      fadeTo: function (e, t, n, a) {
        return this.filter(De)
          .css("opacity", 0)
          .show()
          .end()
          .animate({ opacity: t }, e, n, a);
      },
      animate: function (e, t, n, a) {
        var r = re.isEmptyObject(e),
          o = re.speed(t, n, a),
          i = function () {
            var t = O(this, re.extend({}, e), o);
            (r || re._data(this, "finish")) && t.stop(!0);
          };
        return (
          (i.finish = i),
          r || o.queue === !1 ? this.each(i) : this.queue(o.queue, i)
        );
      },
      stop: function (e, t, n) {
        var a = function (e) {
          var t = e.stop;
          delete e.stop, t(n);
        };
        return (
          "string" != typeof e && ((n = t), (t = e), (e = void 0)),
          t && e !== !1 && this.queue(e || "fx", []),
          this.each(function () {
            var t = !0,
              r = null != e && e + "queueHooks",
              o = re.timers,
              i = re._data(this);
            if (r) i[r] && i[r].stop && a(i[r]);
            else for (r in i) i[r] && i[r].stop && gt.test(r) && a(i[r]);
            for (r = o.length; r--; )
              o[r].elem !== this ||
                (null != e && o[r].queue !== e) ||
                (o[r].anim.stop(n), (t = !1), o.splice(r, 1));
            (t || !n) && re.dequeue(this, e);
          })
        );
      },
      finish: function (e) {
        return (
          e !== !1 && (e = e || "fx"),
          this.each(function () {
            var t,
              n = re._data(this),
              a = n[e + "queue"],
              r = n[e + "queueHooks"],
              o = re.timers,
              i = a ? a.length : 0;
            for (
              n.finish = !0,
                re.queue(this, e, []),
                r && r.stop && r.stop.call(this, !0),
                t = o.length;
              t--;

            )
              o[t].elem === this &&
                o[t].queue === e &&
                (o[t].anim.stop(!0), o.splice(t, 1));
            for (t = 0; i > t; t++)
              a[t] && a[t].finish && a[t].finish.call(this);
            delete n.finish;
          })
        );
      },
    }),
    re.each(["toggle", "show", "hide"], function (e, t) {
      var n = re.fn[t];
      re.fn[t] = function (e, a, r) {
        return null == e || "boolean" == typeof e
          ? n.apply(this, arguments)
          : this.animate(P(t, !0), e, a, r);
      };
    }),
    re.each(
      {
        slideDown: P("show"),
        slideUp: P("hide"),
        slideToggle: P("toggle"),
        fadeIn: { opacity: "show" },
        fadeOut: { opacity: "hide" },
        fadeToggle: { opacity: "toggle" },
      },
      function (e, t) {
        re.fn[e] = function (e, n, a) {
          return this.animate(t, e, n, a);
        };
      }
    ),
    (re.timers = []),
    (re.fx.tick = function () {
      var e,
        t = re.timers,
        n = 0;
      for (ft = re.now(); n < t.length; n++)
        (e = t[n]), e() || t[n] !== e || t.splice(n--, 1);
      t.length || re.fx.stop(), (ft = void 0);
    }),
    (re.fx.timer = function (e) {
      re.timers.push(e), e() ? re.fx.start() : re.timers.pop();
    }),
    (re.fx.interval = 13),
    (re.fx.start = function () {
      ht || (ht = setInterval(re.fx.tick, re.fx.interval));
    }),
    (re.fx.stop = function () {
      clearInterval(ht), (ht = null);
    }),
    (re.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
    (re.fn.delay = function (e, t) {
      return (
        (e = re.fx ? re.fx.speeds[e] || e : e),
        (t = t || "fx"),
        this.queue(t, function (t, n) {
          var a = setTimeout(t, e);
          n.stop = function () {
            clearTimeout(a);
          };
        })
      );
    }),
    (function () {
      var e, t, n, a, r;
      (t = he.createElement("div")),
        t.setAttribute("className", "t"),
        (t.innerHTML =
          "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
        (a = t.getElementsByTagName("a")[0]),
        (n = he.createElement("select")),
        (r = n.appendChild(he.createElement("option"))),
        (e = t.getElementsByTagName("input")[0]),
        (a.style.cssText = "top:1px"),
        (ne.getSetAttribute = "t" !== t.className),
        (ne.style = /top/.test(a.getAttribute("style"))),
        (ne.hrefNormalized = "/a" === a.getAttribute("href")),
        (ne.checkOn = !!e.value),
        (ne.optSelected = r.selected),
        (ne.enctype = !!he.createElement("form").enctype),
        (n.disabled = !0),
        (ne.optDisabled = !r.disabled),
        (e = he.createElement("input")),
        e.setAttribute("value", ""),
        (ne.input = "" === e.getAttribute("value")),
        (e.value = "t"),
        e.setAttribute("type", "radio"),
        (ne.radioValue = "t" === e.value);
    })();
  var bt = /\r/g;
  re.fn.extend({
    val: function (e) {
      var t,
        n,
        a,
        r = this[0];
      return arguments.length
        ? ((a = re.isFunction(e)),
          this.each(function (n) {
            var r;
            1 === this.nodeType &&
              ((r = a ? e.call(this, n, re(this).val()) : e),
              null == r
                ? (r = "")
                : "number" == typeof r
                ? (r += "")
                : re.isArray(r) &&
                  (r = re.map(r, function (e) {
                    return null == e ? "" : e + "";
                  })),
              (t =
                re.valHooks[this.type] ||
                re.valHooks[this.nodeName.toLowerCase()]),
              (t && "set" in t && void 0 !== t.set(this, r, "value")) ||
                (this.value = r));
          }))
        : r
        ? ((t = re.valHooks[r.type] || re.valHooks[r.nodeName.toLowerCase()]),
          t && "get" in t && void 0 !== (n = t.get(r, "value"))
            ? n
            : ((n = r.value),
              "string" == typeof n ? n.replace(bt, "") : null == n ? "" : n))
        : void 0;
    },
  }),
    re.extend({
      valHooks: {
        option: {
          get: function (e) {
            var t = re.find.attr(e, "value");
            return null != t ? t : re.trim(re.text(e));
          },
        },
        select: {
          get: function (e) {
            for (
              var t,
                n,
                a = e.options,
                r = e.selectedIndex,
                o = "select-one" === e.type || 0 > r,
                i = o ? null : [],
                s = o ? r + 1 : a.length,
                l = 0 > r ? s : o ? r : 0;
              s > l;
              l++
            )
              if (
                ((n = a[l]),
                !(
                  (!n.selected && l !== r) ||
                  (ne.optDisabled
                    ? n.disabled
                    : null !== n.getAttribute("disabled")) ||
                  (n.parentNode.disabled &&
                    re.nodeName(n.parentNode, "optgroup"))
                ))
              ) {
                if (((t = re(n).val()), o)) return t;
                i.push(t);
              }
            return i;
          },
          set: function (e, t) {
            for (
              var n, a, r = e.options, o = re.makeArray(t), i = r.length;
              i--;

            )
              if (((a = r[i]), re.inArray(re.valHooks.option.get(a), o) >= 0))
                try {
                  a.selected = n = !0;
                } catch (s) {
                  a.scrollHeight;
                }
              else a.selected = !1;
            return n || (e.selectedIndex = -1), r;
          },
        },
      },
    }),
    re.each(["radio", "checkbox"], function () {
      (re.valHooks[this] = {
        set: function (e, t) {
          return re.isArray(t)
            ? (e.checked = re.inArray(re(e).val(), t) >= 0)
            : void 0;
        },
      }),
        ne.checkOn ||
          (re.valHooks[this].get = function (e) {
            return null === e.getAttribute("value") ? "on" : e.value;
          });
    });
  var Ct,
    wt,
    xt = re.expr.attrHandle,
    Tt = /^(?:checked|selected)$/i,
    kt = ne.getSetAttribute,
    St = ne.input;
  re.fn.extend({
    attr: function (e, t) {
      return Ee(this, re.attr, e, t, arguments.length > 1);
    },
    removeAttr: function (e) {
      return this.each(function () {
        re.removeAttr(this, e);
      });
    },
  }),
    re.extend({
      attr: function (e, t, n) {
        var a,
          r,
          o = e.nodeType;
        if (e && 3 !== o && 8 !== o && 2 !== o)
          return typeof e.getAttribute === xe
            ? re.prop(e, t, n)
            : ((1 === o && re.isXMLDoc(e)) ||
                ((t = t.toLowerCase()),
                (a =
                  re.attrHooks[t] || (re.expr.match.bool.test(t) ? wt : Ct))),
              void 0 === n
                ? a && "get" in a && null !== (r = a.get(e, t))
                  ? r
                  : ((r = re.find.attr(e, t)), null == r ? void 0 : r)
                : null !== n
                ? a && "set" in a && void 0 !== (r = a.set(e, n, t))
                  ? r
                  : (e.setAttribute(t, n + ""), n)
                : void re.removeAttr(e, t));
      },
      removeAttr: function (e, t) {
        var n,
          a,
          r = 0,
          o = t && t.match($e);
        if (o && 1 === e.nodeType)
          for (; (n = o[r++]); )
            (a = re.propFix[n] || n),
              re.expr.match.bool.test(n)
                ? (St && kt) || !Tt.test(n)
                  ? (e[a] = !1)
                  : (e[re.camelCase("default-" + n)] = e[a] = !1)
                : re.attr(e, n, ""),
              e.removeAttribute(kt ? n : a);
      },
      attrHooks: {
        type: {
          set: function (e, t) {
            if (!ne.radioValue && "radio" === t && re.nodeName(e, "input")) {
              var n = e.value;
              return e.setAttribute("type", t), n && (e.value = n), t;
            }
          },
        },
      },
    }),
    (wt = {
      set: function (e, t, n) {
        return (
          t === !1
            ? re.removeAttr(e, n)
            : (St && kt) || !Tt.test(n)
            ? e.setAttribute((!kt && re.propFix[n]) || n, n)
            : (e[re.camelCase("default-" + n)] = e[n] = !0),
          n
        );
      },
    }),
    re.each(re.expr.match.bool.source.match(/\w+/g), function (e, t) {
      var n = xt[t] || re.find.attr;
      xt[t] =
        (St && kt) || !Tt.test(t)
          ? function (e, t, a) {
              var r, o;
              return (
                a ||
                  ((o = xt[t]),
                  (xt[t] = r),
                  (r = null != n(e, t, a) ? t.toLowerCase() : null),
                  (xt[t] = o)),
                r
              );
            }
          : function (e, t, n) {
              return n
                ? void 0
                : e[re.camelCase("default-" + t)]
                ? t.toLowerCase()
                : null;
            };
    }),
    (St && kt) ||
      (re.attrHooks.value = {
        set: function (e, t, n) {
          return re.nodeName(e, "input")
            ? void (e.defaultValue = t)
            : Ct && Ct.set(e, t, n);
        },
      }),
    kt ||
      ((Ct = {
        set: function (e, t, n) {
          var a = e.getAttributeNode(n);
          return (
            a || e.setAttributeNode((a = e.ownerDocument.createAttribute(n))),
            (a.value = t += ""),
            "value" === n || t === e.getAttribute(n) ? t : void 0
          );
        },
      }),
      (xt.id =
        xt.name =
        xt.coords =
          function (e, t, n) {
            var a;
            return n
              ? void 0
              : (a = e.getAttributeNode(t)) && "" !== a.value
              ? a.value
              : null;
          }),
      (re.valHooks.button = {
        get: function (e, t) {
          var n = e.getAttributeNode(t);
          return n && n.specified ? n.value : void 0;
        },
        set: Ct.set,
      }),
      (re.attrHooks.contenteditable = {
        set: function (e, t, n) {
          Ct.set(e, "" !== t && t, n);
        },
      }),
      re.each(["width", "height"], function (e, t) {
        re.attrHooks[t] = {
          set: function (e, n) {
            return "" === n ? (e.setAttribute(t, "auto"), n) : void 0;
          },
        };
      })),
    ne.style ||
      (re.attrHooks.style = {
        get: function (e) {
          return e.style.cssText || void 0;
        },
        set: function (e, t) {
          return (e.style.cssText = t + "");
        },
      });
  var It = /^(?:input|select|textarea|button|object)$/i,
    Dt = /^(?:a|area)$/i;
  re.fn.extend({
    prop: function (e, t) {
      return Ee(this, re.prop, e, t, arguments.length > 1);
    },
    removeProp: function (e) {
      return (
        (e = re.propFix[e] || e),
        this.each(function () {
          try {
            (this[e] = void 0), delete this[e];
          } catch (t) {}
        })
      );
    },
  }),
    re.extend({
      propFix: { for: "htmlFor", class: "className" },
      prop: function (e, t, n) {
        var a,
          r,
          o,
          i = e.nodeType;
        if (e && 3 !== i && 8 !== i && 2 !== i)
          return (
            (o = 1 !== i || !re.isXMLDoc(e)),
            o && ((t = re.propFix[t] || t), (r = re.propHooks[t])),
            void 0 !== n
              ? r && "set" in r && void 0 !== (a = r.set(e, n, t))
                ? a
                : (e[t] = n)
              : r && "get" in r && null !== (a = r.get(e, t))
              ? a
              : e[t]
          );
      },
      propHooks: {
        tabIndex: {
          get: function (e) {
            var t = re.find.attr(e, "tabindex");
            return t
              ? parseInt(t, 10)
              : It.test(e.nodeName) || (Dt.test(e.nodeName) && e.href)
              ? 0
              : -1;
          },
        },
      },
    }),
    ne.hrefNormalized ||
      re.each(["href", "src"], function (e, t) {
        re.propHooks[t] = {
          get: function (e) {
            return e.getAttribute(t, 4);
          },
        };
      }),
    ne.optSelected ||
      (re.propHooks.selected = {
        get: function (e) {
          var t = e.parentNode;
          return (
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
            null
          );
        },
      }),
    re.each(
      [
        "tabIndex",
        "readOnly",
        "maxLength",
        "cellSpacing",
        "cellPadding",
        "rowSpan",
        "colSpan",
        "useMap",
        "frameBorder",
        "contentEditable",
      ],
      function () {
        re.propFix[this.toLowerCase()] = this;
      }
    ),
    ne.enctype || (re.propFix.enctype = "encoding");
  var Et = /[\t\r\n\f]/g;
  re.fn.extend({
    addClass: function (e) {
      var t,
        n,
        a,
        r,
        o,
        i,
        s = 0,
        l = this.length,
        d = "string" == typeof e && e;
      if (re.isFunction(e))
        return this.each(function (t) {
          re(this).addClass(e.call(this, t, this.className));
        });
      if (d)
        for (t = (e || "").match($e) || []; l > s; s++)
          if (
            ((n = this[s]),
            (a =
              1 === n.nodeType &&
              (n.className ? (" " + n.className + " ").replace(Et, " ") : " ")))
          ) {
            for (o = 0; (r = t[o++]); )
              a.indexOf(" " + r + " ") < 0 && (a += r + " ");
            (i = re.trim(a)), n.className !== i && (n.className = i);
          }
      return this;
    },
    removeClass: function (e) {
      var t,
        n,
        a,
        r,
        o,
        i,
        s = 0,
        l = this.length,
        d = 0 === arguments.length || ("string" == typeof e && e);
      if (re.isFunction(e))
        return this.each(function (t) {
          re(this).removeClass(e.call(this, t, this.className));
        });
      if (d)
        for (t = (e || "").match($e) || []; l > s; s++)
          if (
            ((n = this[s]),
            (a =
              1 === n.nodeType &&
              (n.className ? (" " + n.className + " ").replace(Et, " ") : "")))
          ) {
            for (o = 0; (r = t[o++]); )
              for (; a.indexOf(" " + r + " ") >= 0; )
                a = a.replace(" " + r + " ", " ");
            (i = e ? re.trim(a) : ""), n.className !== i && (n.className = i);
          }
      return this;
    },
    toggleClass: function (e, t) {
      var n = typeof e;
      return "boolean" == typeof t && "string" === n
        ? t
          ? this.addClass(e)
          : this.removeClass(e)
        : this.each(
            re.isFunction(e)
              ? function (n) {
                  re(this).toggleClass(e.call(this, n, this.className, t), t);
                }
              : function () {
                  if ("string" === n)
                    for (
                      var t, a = 0, r = re(this), o = e.match($e) || [];
                      (t = o[a++]);

                    )
                      r.hasClass(t) ? r.removeClass(t) : r.addClass(t);
                  else
                    (n === xe || "boolean" === n) &&
                      (this.className &&
                        re._data(this, "__className__", this.className),
                      (this.className =
                        this.className || e === !1
                          ? ""
                          : re._data(this, "__className__") || ""));
                }
          );
    },
    hasClass: function (e) {
      for (var t = " " + e + " ", n = 0, a = this.length; a > n; n++)
        if (
          1 === this[n].nodeType &&
          (" " + this[n].className + " ").replace(Et, " ").indexOf(t) >= 0
        )
          return !0;
      return !1;
    },
  }),
    re.each(
      "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
        " "
      ),
      function (e, t) {
        re.fn[t] = function (e, n) {
          return arguments.length > 0
            ? this.on(t, null, e, n)
            : this.trigger(t);
        };
      }
    ),
    re.fn.extend({
      hover: function (e, t) {
        return this.mouseenter(e).mouseleave(t || e);
      },
      bind: function (e, t, n) {
        return this.on(e, null, t, n);
      },
      unbind: function (e, t) {
        return this.off(e, null, t);
      },
      delegate: function (e, t, n, a) {
        return this.on(t, e, n, a);
      },
      undelegate: function (e, t, n) {
        return 1 === arguments.length
          ? this.off(e, "**")
          : this.off(t, e || "**", n);
      },
    });
  var Ft = re.now(),
    Mt = /\?/,
    At =
      /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
  (re.parseJSON = function (t) {
    if (e.JSON && e.JSON.parse) return e.JSON.parse(t + "");
    var n,
      a = null,
      r = re.trim(t + "");
    return r &&
      !re.trim(
        r.replace(At, function (e, t, r, o) {
          return (
            n && t && (a = 0), 0 === a ? e : ((n = r || t), (a += !o - !r), "")
          );
        })
      )
      ? Function("return " + r)()
      : re.error("Invalid JSON: " + t);
  }),
    (re.parseXML = function (t) {
      var n, a;
      if (!t || "string" != typeof t) return null;
      try {
        e.DOMParser
          ? ((a = new DOMParser()), (n = a.parseFromString(t, "text/xml")))
          : ((n = new ActiveXObject("Microsoft.XMLDOM")),
            (n.async = "false"),
            n.loadXML(t));
      } catch (r) {
        n = void 0;
      }
      return (
        (n &&
          n.documentElement &&
          !n.getElementsByTagName("parsererror").length) ||
          re.error("Invalid XML: " + t),
        n
      );
    });
  var Nt,
    Pt,
    _t = /#.*$/,
    jt = /([?&])_=[^&]*/,
    Lt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
    Ot = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
    Ht = /^(?:GET|HEAD)$/,
    Bt = /^\/\//,
    Rt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
    qt = {},
    Wt = {},
    Vt = "*/".concat("*");
  try {
    Pt = location.href;
  } catch (zt) {
    (Pt = he.createElement("a")), (Pt.href = ""), (Pt = Pt.href);
  }
  (Nt = Rt.exec(Pt.toLowerCase()) || []),
    re.extend({
      active: 0,
      lastModified: {},
      etag: {},
      ajaxSettings: {
        url: Pt,
        type: "GET",
        isLocal: Ot.test(Nt[1]),
        global: !0,
        processData: !0,
        async: !0,
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        accepts: {
          "*": Vt,
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
        },
        contents: { xml: /xml/, html: /html/, json: /json/ },
        responseFields: {
          xml: "responseXML",
          text: "responseText",
          json: "responseJSON",
        },
        converters: {
          "* text": String,
          "text html": !0,
          "text json": re.parseJSON,
          "text xml": re.parseXML,
        },
        flatOptions: { url: !0, context: !0 },
      },
      ajaxSetup: function (e, t) {
        return t ? R(R(e, re.ajaxSettings), t) : R(re.ajaxSettings, e);
      },
      ajaxPrefilter: H(qt),
      ajaxTransport: H(Wt),
      ajax: function (e, t) {
        function n(e, t, n, a) {
          var r,
            c,
            g,
            y,
            b,
            w = t;
          2 !== $ &&
            (($ = 2),
            s && clearTimeout(s),
            (d = void 0),
            (i = a || ""),
            (C.readyState = e > 0 ? 4 : 0),
            (r = (e >= 200 && 300 > e) || 304 === e),
            n && (y = q(u, C, n)),
            (y = W(u, y, C, r)),
            r
              ? (u.ifModified &&
                  ((b = C.getResponseHeader("Last-Modified")),
                  b && (re.lastModified[o] = b),
                  (b = C.getResponseHeader("etag")),
                  b && (re.etag[o] = b)),
                204 === e || "HEAD" === u.type
                  ? (w = "nocontent")
                  : 304 === e
                  ? (w = "notmodified")
                  : ((w = y.state), (c = y.data), (g = y.error), (r = !g)))
              : ((g = w), (e || !w) && ((w = "error"), 0 > e && (e = 0))),
            (C.status = e),
            (C.statusText = (t || w) + ""),
            r ? h.resolveWith(p, [c, w, C]) : h.rejectWith(p, [C, w, g]),
            C.statusCode(v),
            (v = void 0),
            l && f.trigger(r ? "ajaxSuccess" : "ajaxError", [C, u, r ? c : g]),
            m.fireWith(p, [C, w]),
            l &&
              (f.trigger("ajaxComplete", [C, u]),
              --re.active || re.event.trigger("ajaxStop")));
        }
        "object" == typeof e && ((t = e), (e = void 0)), (t = t || {});
        var a,
          r,
          o,
          i,
          s,
          l,
          d,
          c,
          u = re.ajaxSetup({}, t),
          p = u.context || u,
          f = u.context && (p.nodeType || p.jquery) ? re(p) : re.event,
          h = re.Deferred(),
          m = re.Callbacks("once memory"),
          v = u.statusCode || {},
          g = {},
          y = {},
          $ = 0,
          b = "canceled",
          C = {
            readyState: 0,
            getResponseHeader: function (e) {
              var t;
              if (2 === $) {
                if (!c)
                  for (c = {}; (t = Lt.exec(i)); ) c[t[1].toLowerCase()] = t[2];
                t = c[e.toLowerCase()];
              }
              return null == t ? null : t;
            },
            getAllResponseHeaders: function () {
              return 2 === $ ? i : null;
            },
            setRequestHeader: function (e, t) {
              var n = e.toLowerCase();
              return $ || ((e = y[n] = y[n] || e), (g[e] = t)), this;
            },
            overrideMimeType: function (e) {
              return $ || (u.mimeType = e), this;
            },
            statusCode: function (e) {
              var t;
              if (e)
                if (2 > $) for (t in e) v[t] = [v[t], e[t]];
                else C.always(e[C.status]);
              return this;
            },
            abort: function (e) {
              var t = e || b;
              return d && d.abort(t), n(0, t), this;
            },
          };
        if (
          ((h.promise(C).complete = m.add),
          (C.success = C.done),
          (C.error = C.fail),
          (u.url = ((e || u.url || Pt) + "")
            .replace(_t, "")
            .replace(Bt, Nt[1] + "//")),
          (u.type = t.method || t.type || u.method || u.type),
          (u.dataTypes = re
            .trim(u.dataType || "*")
            .toLowerCase()
            .match($e) || [""]),
          null == u.crossDomain &&
            ((a = Rt.exec(u.url.toLowerCase())),
            (u.crossDomain = !(
              !a ||
              (a[1] === Nt[1] &&
                a[2] === Nt[2] &&
                (a[3] || ("http:" === a[1] ? "80" : "443")) ===
                  (Nt[3] || ("http:" === Nt[1] ? "80" : "443")))
            ))),
          u.data &&
            u.processData &&
            "string" != typeof u.data &&
            (u.data = re.param(u.data, u.traditional)),
          B(qt, u, t, C),
          2 === $)
        )
          return C;
        (l = u.global),
          l && 0 === re.active++ && re.event.trigger("ajaxStart"),
          (u.type = u.type.toUpperCase()),
          (u.hasContent = !Ht.test(u.type)),
          (o = u.url),
          u.hasContent ||
            (u.data &&
              ((o = u.url += (Mt.test(o) ? "&" : "?") + u.data), delete u.data),
            u.cache === !1 &&
              (u.url = jt.test(o)
                ? o.replace(jt, "$1_=" + Ft++)
                : o + (Mt.test(o) ? "&" : "?") + "_=" + Ft++)),
          u.ifModified &&
            (re.lastModified[o] &&
              C.setRequestHeader("If-Modified-Since", re.lastModified[o]),
            re.etag[o] && C.setRequestHeader("If-None-Match", re.etag[o])),
          ((u.data && u.hasContent && u.contentType !== !1) || t.contentType) &&
            C.setRequestHeader("Content-Type", u.contentType),
          C.setRequestHeader(
            "Accept",
            u.dataTypes[0] && u.accepts[u.dataTypes[0]]
              ? u.accepts[u.dataTypes[0]] +
                  ("*" !== u.dataTypes[0] ? ", " + Vt + "; q=0.01" : "")
              : u.accepts["*"]
          );
        for (r in u.headers) C.setRequestHeader(r, u.headers[r]);
        if (u.beforeSend && (u.beforeSend.call(p, C, u) === !1 || 2 === $))
          return C.abort();
        b = "abort";
        for (r in { success: 1, error: 1, complete: 1 }) C[r](u[r]);
        if ((d = B(Wt, u, t, C))) {
          (C.readyState = 1),
            l && f.trigger("ajaxSend", [C, u]),
            u.async &&
              u.timeout > 0 &&
              (s = setTimeout(function () {
                C.abort("timeout");
              }, u.timeout));
          try {
            ($ = 1), d.send(g, n);
          } catch (w) {
            if (!(2 > $)) throw w;
            n(-1, w);
          }
        } else n(-1, "No Transport");
        return C;
      },
      getJSON: function (e, t, n) {
        return re.get(e, t, n, "json");
      },
      getScript: function (e, t) {
        return re.get(e, void 0, t, "script");
      },
    }),
    re.each(["get", "post"], function (e, t) {
      re[t] = function (e, n, a, r) {
        return (
          re.isFunction(n) && ((r = r || a), (a = n), (n = void 0)),
          re.ajax({ url: e, type: t, dataType: r, data: n, success: a })
        );
      };
    }),
    re.each(
      [
        "ajaxStart",
        "ajaxStop",
        "ajaxComplete",
        "ajaxError",
        "ajaxSuccess",
        "ajaxSend",
      ],
      function (e, t) {
        re.fn[t] = function (e) {
          return this.on(t, e);
        };
      }
    ),
    (re._evalUrl = function (e) {
      return re.ajax({
        url: e,
        type: "GET",
        dataType: "script",
        async: !1,
        global: !1,
        throws: !0,
      });
    }),
    re.fn.extend({
      wrapAll: function (e) {
        if (re.isFunction(e))
          return this.each(function (t) {
            re(this).wrapAll(e.call(this, t));
          });
        if (this[0]) {
          var t = re(e, this[0].ownerDocument).eq(0).clone(!0);
          this[0].parentNode && t.insertBefore(this[0]),
            t
              .map(function () {
                for (
                  var e = this;
                  e.firstChild && 1 === e.firstChild.nodeType;

                )
                  e = e.firstChild;
                return e;
              })
              .append(this);
        }
        return this;
      },
      wrapInner: function (e) {
        return this.each(
          re.isFunction(e)
            ? function (t) {
                re(this).wrapInner(e.call(this, t));
              }
            : function () {
                var t = re(this),
                  n = t.contents();
                n.length ? n.wrapAll(e) : t.append(e);
              }
        );
      },
      wrap: function (e) {
        var t = re.isFunction(e);
        return this.each(function (n) {
          re(this).wrapAll(t ? e.call(this, n) : e);
        });
      },
      unwrap: function () {
        return this.parent()
          .each(function () {
            re.nodeName(this, "body") || re(this).replaceWith(this.childNodes);
          })
          .end();
      },
    }),
    (re.expr.filters.hidden = function (e) {
      return (
        (e.offsetWidth <= 0 && e.offsetHeight <= 0) ||
        (!ne.reliableHiddenOffsets() &&
          "none" === ((e.style && e.style.display) || re.css(e, "display")))
      );
    }),
    (re.expr.filters.visible = function (e) {
      return !re.expr.filters.hidden(e);
    });
  var Yt = /%20/g,
    Ut = /\[\]$/,
    Xt = /\r?\n/g,
    Qt = /^(?:submit|button|image|reset|file)$/i,
    Kt = /^(?:input|select|textarea|keygen)/i;
  (re.param = function (e, t) {
    var n,
      a = [],
      r = function (e, t) {
        (t = re.isFunction(t) ? t() : null == t ? "" : t),
          (a[a.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t));
      };
    if (
      (void 0 === t && (t = re.ajaxSettings && re.ajaxSettings.traditional),
      re.isArray(e) || (e.jquery && !re.isPlainObject(e)))
    )
      re.each(e, function () {
        r(this.name, this.value);
      });
    else for (n in e) V(n, e[n], t, r);
    return a.join("&").replace(Yt, "+");
  }),
    re.fn.extend({
      serialize: function () {
        return re.param(this.serializeArray());
      },
      serializeArray: function () {
        return this.map(function () {
          var e = re.prop(this, "elements");
          return e ? re.makeArray(e) : this;
        })
          .filter(function () {
            var e = this.type;
            return (
              this.name &&
              !re(this).is(":disabled") &&
              Kt.test(this.nodeName) &&
              !Qt.test(e) &&
              (this.checked || !Fe.test(e))
            );
          })
          .map(function (e, t) {
            var n = re(this).val();
            return null == n
              ? null
              : re.isArray(n)
              ? re.map(n, function (e) {
                  return {
                    name: t.name,
                    value: e.replace(Xt, "\r\n"),
                  };
                })
              : { name: t.name, value: n.replace(Xt, "\r\n") };
          })
          .get();
      },
    }),
    (re.ajaxSettings.xhr =
      void 0 !== e.ActiveXObject
        ? function () {
            return (
              (!this.isLocal &&
                /^(get|post|head|put|delete|options)$/i.test(this.type) &&
                z()) ||
              Y()
            );
          }
        : z);
  var Jt = 0,
    Gt = {},
    Zt = re.ajaxSettings.xhr();
  e.ActiveXObject &&
    re(e).on("unload", function () {
      for (var e in Gt) Gt[e](void 0, !0);
    }),
    (ne.cors = !!Zt && "withCredentials" in Zt),
    (Zt = ne.ajax = !!Zt),
    Zt &&
      re.ajaxTransport(function (e) {
        if (!e.crossDomain || ne.cors) {
          var t;
          return {
            send: function (n, a) {
              var r,
                o = e.xhr(),
                i = ++Jt;
              if (
                (o.open(e.type, e.url, e.async, e.username, e.password),
                e.xhrFields)
              )
                for (r in e.xhrFields) o[r] = e.xhrFields[r];
              e.mimeType &&
                o.overrideMimeType &&
                o.overrideMimeType(e.mimeType),
                e.crossDomain ||
                  n["X-Requested-With"] ||
                  (n["X-Requested-With"] = "XMLHttpRequest");
              for (r in n) void 0 !== n[r] && o.setRequestHeader(r, n[r] + "");
              o.send((e.hasContent && e.data) || null),
                (t = function (n, r) {
                  var s, l, d;
                  if (t && (r || 4 === o.readyState))
                    if (
                      (delete Gt[i],
                      (t = void 0),
                      (o.onreadystatechange = re.noop),
                      r)
                    )
                      4 !== o.readyState && o.abort();
                    else {
                      (d = {}),
                        (s = o.status),
                        "string" == typeof o.responseText &&
                          (d.text = o.responseText);
                      try {
                        l = o.statusText;
                      } catch (c) {
                        l = "";
                      }
                      s || !e.isLocal || e.crossDomain
                        ? 1223 === s && (s = 204)
                        : (s = d.text ? 200 : 404);
                    }
                  d && a(s, l, d, o.getAllResponseHeaders());
                }),
                e.async
                  ? 4 === o.readyState
                    ? setTimeout(t)
                    : (o.onreadystatechange = Gt[i] = t)
                  : t();
            },
            abort: function () {
              t && t(void 0, !0);
            },
          };
        }
      }),
    re.ajaxSetup({
      accepts: {
        script:
          "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
      },
      contents: { script: /(?:java|ecma)script/ },
      converters: {
        "text script": function (e) {
          return re.globalEval(e), e;
        },
      },
    }),
    re.ajaxPrefilter("script", function (e) {
      void 0 === e.cache && (e.cache = !1),
        e.crossDomain && ((e.type = "GET"), (e.global = !1));
    }),
    re.ajaxTransport("script", function (e) {
      if (e.crossDomain) {
        var t,
          n = he.head || re("head")[0] || he.documentElement;
        return {
          send: function (a, r) {
            (t = he.createElement("script")),
              (t.async = !0),
              e.scriptCharset && (t.charset = e.scriptCharset),
              (t.src = e.url),
              (t.onload = t.onreadystatechange =
                function (e, n) {
                  (n ||
                    !t.readyState ||
                    /loaded|complete/.test(t.readyState)) &&
                    ((t.onload = t.onreadystatechange = null),
                    t.parentNode && t.parentNode.removeChild(t),
                    (t = null),
                    n || r(200, "success"));
                }),
              n.insertBefore(t, n.firstChild);
          },
          abort: function () {
            t && t.onload(void 0, !0);
          },
        };
      }
    });
  var en = [],
    tn = /(=)\?(?=&|$)|\?\?/;
  re.ajaxSetup({
    jsonp: "callback",
    jsonpCallback: function () {
      var e = en.pop() || re.expando + "_" + Ft++;
      return (this[e] = !0), e;
    },
  }),
    re.ajaxPrefilter("json jsonp", function (t, n, a) {
      var r,
        o,
        i,
        s =
          t.jsonp !== !1 &&
          (tn.test(t.url)
            ? "url"
            : "string" == typeof t.data &&
              !(t.contentType || "").indexOf(
                "application/x-www-form-urlencoded"
              ) &&
              tn.test(t.data) &&
              "data");
      return s || "jsonp" === t.dataTypes[0]
        ? ((r = t.jsonpCallback =
            re.isFunction(t.jsonpCallback)
              ? t.jsonpCallback()
              : t.jsonpCallback),
          s
            ? (t[s] = t[s].replace(tn, "$1" + r))
            : t.jsonp !== !1 &&
              (t.url += (Mt.test(t.url) ? "&" : "?") + t.jsonp + "=" + r),
          (t.converters["script json"] = function () {
            return i || re.error(r + " was not called"), i[0];
          }),
          (t.dataTypes[0] = "json"),
          (o = e[r]),
          (e[r] = function () {
            i = arguments;
          }),
          a.always(function () {
            (e[r] = o),
              t[r] && ((t.jsonpCallback = n.jsonpCallback), en.push(r)),
              i && re.isFunction(o) && o(i[0]),
              (i = o = void 0);
          }),
          "script")
        : void 0;
    }),
    (re.parseHTML = function (e, t, n) {
      if (!e || "string" != typeof e) return null;
      "boolean" == typeof t && ((n = t), (t = !1)), (t = t || he);
      var a = ue.exec(e),
        r = !n && [];
      return a
        ? [t.createElement(a[1])]
        : ((a = re.buildFragment([e], t, r)),
          r && r.length && re(r).remove(),
          re.merge([], a.childNodes));
    });
  var nn = re.fn.load;
  (re.fn.load = function (e, t, n) {
    if ("string" != typeof e && nn) return nn.apply(this, arguments);
    var a,
      r,
      o,
      i = this,
      s = e.indexOf(" ");
    return (
      s >= 0 && ((a = re.trim(e.slice(s, e.length))), (e = e.slice(0, s))),
      re.isFunction(t)
        ? ((n = t), (t = void 0))
        : t && "object" == typeof t && (o = "POST"),
      i.length > 0 &&
        re
          .ajax({ url: e, type: o, dataType: "html", data: t })
          .done(function (e) {
            (r = arguments),
              i.html(a ? re("<div>").append(re.parseHTML(e)).find(a) : e);
          })
          .complete(
            n &&
              function (e, t) {
                i.each(n, r || [e.responseText, t, e]);
              }
          ),
      this
    );
  }),
    (re.expr.filters.animated = function (e) {
      return re.grep(re.timers, function (t) {
        return e === t.elem;
      }).length;
    });
  var an = e.document.documentElement;
  (re.offset = {
    setOffset: function (e, t, n) {
      var a,
        r,
        o,
        i,
        s,
        l,
        d,
        c = re.css(e, "position"),
        u = re(e),
        p = {};
      "static" === c && (e.style.position = "relative"),
        (s = u.offset()),
        (o = re.css(e, "top")),
        (l = re.css(e, "left")),
        (d =
          ("absolute" === c || "fixed" === c) &&
          re.inArray("auto", [o, l]) > -1),
        d
          ? ((a = u.position()), (i = a.top), (r = a.left))
          : ((i = parseFloat(o) || 0), (r = parseFloat(l) || 0)),
        re.isFunction(t) && (t = t.call(e, n, s)),
        null != t.top && (p.top = t.top - s.top + i),
        null != t.left && (p.left = t.left - s.left + r),
        "using" in t ? t.using.call(e, p) : u.css(p);
    },
  }),
    re.fn.extend({
      offset: function (e) {
        if (arguments.length)
          return void 0 === e
            ? this
            : this.each(function (t) {
                re.offset.setOffset(this, e, t);
              });
        var t,
          n,
          a = { top: 0, left: 0 },
          r = this[0],
          o = r && r.ownerDocument;
        return o
          ? ((t = o.documentElement),
            re.contains(t, r)
              ? (typeof r.getBoundingClientRect !== xe &&
                  (a = r.getBoundingClientRect()),
                (n = U(o)),
                {
                  top:
                    a.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                  left:
                    a.left +
                    (n.pageXOffset || t.scrollLeft) -
                    (t.clientLeft || 0),
                })
              : a)
          : void 0;
      },
      position: function () {
        if (this[0]) {
          var e,
            t,
            n = { top: 0, left: 0 },
            a = this[0];
          return (
            "fixed" === re.css(a, "position")
              ? (t = a.getBoundingClientRect())
              : ((e = this.offsetParent()),
                (t = this.offset()),
                re.nodeName(e[0], "html") || (n = e.offset()),
                (n.top += re.css(e[0], "borderTopWidth", !0)),
                (n.left += re.css(e[0], "borderLeftWidth", !0))),
            {
              top: t.top - n.top - re.css(a, "marginTop", !0),
              left: t.left - n.left - re.css(a, "marginLeft", !0),
            }
          );
        }
      },
      offsetParent: function () {
        return this.map(function () {
          for (
            var e = this.offsetParent || an;
            e && !re.nodeName(e, "html") && "static" === re.css(e, "position");

          )
            e = e.offsetParent;
          return e || an;
        });
      },
    }),
    re.each(
      { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
      function (e, t) {
        var n = /Y/.test(t);
        re.fn[e] = function (a) {
          return Ee(
            this,
            function (e, a, r) {
              var o = U(e);
              return void 0 === r
                ? o
                  ? t in o
                    ? o[t]
                    : o.document.documentElement[a]
                  : e[a]
                : void (o
                    ? o.scrollTo(
                        n ? re(o).scrollLeft() : r,
                        n ? r : re(o).scrollTop()
                      )
                    : (e[a] = r));
            },
            e,
            a,
            arguments.length,
            null
          );
        };
      }
    ),
    re.each(["top", "left"], function (e, t) {
      re.cssHooks[t] = S(ne.pixelPosition, function (e, n) {
        return n
          ? ((n = tt(e, t)), at.test(n) ? re(e).position()[t] + "px" : n)
          : void 0;
      });
    }),
    re.each({ Height: "height", Width: "width" }, function (e, t) {
      re.each(
        { padding: "inner" + e, content: t, "": "outer" + e },
        function (n, a) {
          re.fn[a] = function (a, r) {
            var o = arguments.length && (n || "boolean" != typeof a),
              i = n || (a === !0 || r === !0 ? "margin" : "border");
            return Ee(
              this,
              function (t, n, a) {
                var r;
                return re.isWindow(t)
                  ? t.document.documentElement["client" + e]
                  : 9 === t.nodeType
                  ? ((r = t.documentElement),
                    Math.max(
                      t.body["scroll" + e],
                      r["scroll" + e],
                      t.body["offset" + e],
                      r["offset" + e],
                      r["client" + e]
                    ))
                  : void 0 === a
                  ? re.css(t, n, i)
                  : re.style(t, n, a, i);
              },
              t,
              o ? a : void 0,
              o,
              null
            );
          };
        }
      );
    }),
    (re.fn.size = function () {
      return this.length;
    }),
    (re.fn.andSelf = re.fn.addBack),
    "function" == typeof define &&
      define.amd &&
      define("jquery", [], function () {
        return re;
      });
  var rn = e.jQuery,
    on = e.$;
  return (
    (re.noConflict = function (t) {
      return (
        e.$ === re && (e.$ = on), t && e.jQuery === re && (e.jQuery = rn), re
      );
    }),
    typeof t === xe && (e.jQuery = e.$ = re),
    re
  );
}),
  (function (e, t) {
    "function" == typeof define && define.amd
      ? define(["jquery"], t)
      : "object" == typeof exports
      ? (module.exports = t(require("jquery")))
      : t(e.jQuery);
  })(this, function (e) {
    function t(e) {
      if (e in u.style) return e;
      for (
        var t = ["Moz", "Webkit", "O", "ms"],
          n = e.charAt(0).toUpperCase() + e.substr(1),
          a = 0;
        a < t.length;
        ++a
      ) {
        var r = t[a] + n;
        if (r in u.style) return r;
      }
    }
    function n() {
      return (
        (u.style[p.transform] = ""),
        (u.style[p.transform] = "rotateY(90deg)"),
        "" !== u.style[p.transform]
      );
    }
    function a(e) {
      return "string" == typeof e && this.parse(e), this;
    }
    function r(e, t, n) {
      t === !0
        ? e.queue(n)
        : t
        ? e.queue(t, n)
        : e.each(function () {
            n.call(this);
          });
    }
    function o(t) {
      var n = [];
      return (
        e.each(t, function (t) {
          (t = e.camelCase(t)),
            (t = e.transit.propertyMap[t] || e.cssProps[t] || t),
            (t = l(t)),
            p[t] && (t = l(p[t])),
            e.inArray(t, n) === -1 && n.push(t);
        }),
        n
      );
    }
    function i(t, n, a, r) {
      var i = o(t);
      e.cssEase[a] && (a = e.cssEase[a]);
      var s = "" + c(n) + " " + a;
      parseInt(r, 10) > 0 && (s += " " + c(r));
      var l = [];
      return (
        e.each(i, function (e, t) {
          l.push(t + " " + s);
        }),
        l.join(", ")
      );
    }
    function s(t, n) {
      n || (e.cssNumber[t] = !0),
        (e.transit.propertyMap[t] = p.transform),
        (e.cssHooks[t] = {
          get: function (n) {
            var a = e(n).css("transit:transform");
            return a.get(t);
          },
          set: function (n, a) {
            var r = e(n).css("transit:transform");
            r.setFromString(t, a), e(n).css({ "transit:transform": r });
          },
        });
    }
    function l(e) {
      return e.replace(/([A-Z])/g, function (e) {
        return "-" + e.toLowerCase();
      });
    }
    function d(e, t) {
      return "string" != typeof e || e.match(/^[\-0-9\.]+$/) ? "" + e + t : e;
    }
    function c(t) {
      var n = t;
      return (
        "string" != typeof n ||
          n.match(/^[\-0-9\.]+/) ||
          (n = e.fx.speeds[n] || e.fx.speeds._default),
        d(n, "ms")
      );
    }
    e.transit = {
      version: "0.9.12",
      propertyMap: {
        marginLeft: "margin",
        marginRight: "margin",
        marginBottom: "margin",
        marginTop: "margin",
        paddingLeft: "padding",
        paddingRight: "padding",
        paddingBottom: "padding",
        paddingTop: "padding",
      },
      enabled: !0,
      useTransitionEnd: !1,
    };
    var u = document.createElement("div"),
      p = {},
      f = navigator.userAgent.toLowerCase().indexOf("chrome") > -1;
    (p.transition = t("transition")),
      (p.transitionDelay = t("transitionDelay")),
      (p.transform = t("transform")),
      (p.transformOrigin = t("transformOrigin")),
      (p.filter = t("Filter")),
      (p.transform3d = n());
    var h = {
        transition: "transitionend",
        MozTransition: "transitionend",
        OTransition: "oTransitionEnd",
        WebkitTransition: "webkitTransitionEnd",
        msTransition: "MSTransitionEnd",
      },
      m = (p.transitionEnd = h[p.transition] || null);
    for (var v in p)
      p.hasOwnProperty(v) &&
        "undefined" == typeof e.support[v] &&
        (e.support[v] = p[v]);
    return (
      (u = null),
      (e.cssEase = {
        _default: "ease",
        in: "ease-in",
        out: "ease-out",
        "in-out": "ease-in-out",
        snap: "cubic-bezier(0,1,.5,1)",
        easeInCubic: "cubic-bezier(.550,.055,.675,.190)",
        easeOutCubic: "cubic-bezier(.215,.61,.355,1)",
        easeInOutCubic: "cubic-bezier(.645,.045,.355,1)",
        easeInCirc: "cubic-bezier(.6,.04,.98,.335)",
        easeOutCirc: "cubic-bezier(.075,.82,.165,1)",
        easeInOutCirc: "cubic-bezier(.785,.135,.15,.86)",
        easeInExpo: "cubic-bezier(.95,.05,.795,.035)",
        easeOutExpo: "cubic-bezier(.19,1,.22,1)",
        easeInOutExpo: "cubic-bezier(1,0,0,1)",
        easeInQuad: "cubic-bezier(.55,.085,.68,.53)",
        easeOutQuad: "cubic-bezier(.25,.46,.45,.94)",
        easeInOutQuad: "cubic-bezier(.455,.03,.515,.955)",
        easeInQuart: "cubic-bezier(.895,.03,.685,.22)",
        easeOutQuart: "cubic-bezier(.165,.84,.44,1)",
        easeInOutQuart: "cubic-bezier(.77,0,.175,1)",
        easeInQuint: "cubic-bezier(.755,.05,.855,.06)",
        easeOutQuint: "cubic-bezier(.23,1,.32,1)",
        easeInOutQuint: "cubic-bezier(.86,0,.07,1)",
        easeInSine: "cubic-bezier(.47,0,.745,.715)",
        easeOutSine: "cubic-bezier(.39,.575,.565,1)",
        easeInOutSine: "cubic-bezier(.445,.05,.55,.95)",
        easeInBack: "cubic-bezier(.6,-.28,.735,.045)",
        easeOutBack: "cubic-bezier(.175, .885,.32,1.275)",
        easeInOutBack: "cubic-bezier(.68,-.55,.265,1.55)",
      }),
      (e.cssHooks["transit:transform"] = {
        get: function (t) {
          return e(t).data("transform") || new a();
        },
        set: function (t, n) {
          var r = n;
          r instanceof a || (r = new a(r)),
            "WebkitTransform" !== p.transform || f
              ? (t.style[p.transform] = r.toString())
              : (t.style[p.transform] = r.toString(!0)),
            e(t).data("transform", r);
        },
      }),
      (e.cssHooks.transform = { set: e.cssHooks["transit:transform"].set }),
      (e.cssHooks.filter = {
        get: function (e) {
          return e.style[p.filter];
        },
        set: function (e, t) {
          e.style[p.filter] = t;
        },
      }),
      e.fn.jquery < "1.8" &&
        ((e.cssHooks.transformOrigin = {
          get: function (e) {
            return e.style[p.transformOrigin];
          },
          set: function (e, t) {
            e.style[p.transformOrigin] = t;
          },
        }),
        (e.cssHooks.transition = {
          get: function (e) {
            return e.style[p.transition];
          },
          set: function (e, t) {
            e.style[p.transition] = t;
          },
        })),
      s("scale"),
      s("scaleX"),
      s("scaleY"),
      s("translate"),
      s("rotate"),
      s("rotateX"),
      s("rotateY"),
      s("rotate3d"),
      s("perspective"),
      s("skewX"),
      s("skewY"),
      s("x", !0),
      s("y", !0),
      (a.prototype = {
        setFromString: function (e, t) {
          var n =
            "string" == typeof t
              ? t.split(",")
              : t.constructor === Array
              ? t
              : [t];
          n.unshift(e), a.prototype.set.apply(this, n);
        },
        set: function (e) {
          var t = Array.prototype.slice.apply(arguments, [1]);
          this.setter[e]
            ? this.setter[e].apply(this, t)
            : (this[e] = t.join(","));
        },
        get: function (e) {
          return this.getter[e] ? this.getter[e].apply(this) : this[e] || 0;
        },
        setter: {
          rotate: function (e) {
            this.rotate = d(e, "deg");
          },
          rotateX: function (e) {
            this.rotateX = d(e, "deg");
          },
          rotateY: function (e) {
            this.rotateY = d(e, "deg");
          },
          scale: function (e, t) {
            void 0 === t && (t = e), (this.scale = e + "," + t);
          },
          skewX: function (e) {
            this.skewX = d(e, "deg");
          },
          skewY: function (e) {
            this.skewY = d(e, "deg");
          },
          perspective: function (e) {
            this.perspective = d(e, "px");
          },
          x: function (e) {
            this.set("translate", e, null);
          },
          y: function (e) {
            this.set("translate", null, e);
          },
          translate: function (e, t) {
            void 0 === this._translateX && (this._translateX = 0),
              void 0 === this._translateY && (this._translateY = 0),
              null !== e && void 0 !== e && (this._translateX = d(e, "px")),
              null !== t && void 0 !== t && (this._translateY = d(t, "px")),
              (this.translate = this._translateX + "," + this._translateY);
          },
        },
        getter: {
          x: function () {
            return this._translateX || 0;
          },
          y: function () {
            return this._translateY || 0;
          },
          scale: function () {
            var e = (this.scale || "1,1").split(",");
            return (
              e[0] && (e[0] = parseFloat(e[0])),
              e[1] && (e[1] = parseFloat(e[1])),
              e[0] === e[1] ? e[0] : e
            );
          },
          rotate3d: function () {
            for (
              var e = (this.rotate3d || "0,0,0,0deg").split(","), t = 0;
              t <= 3;
              ++t
            )
              e[t] && (e[t] = parseFloat(e[t]));
            return e[3] && (e[3] = d(e[3], "deg")), e;
          },
        },
        parse: function (e) {
          var t = this;
          e.replace(/([a-zA-Z0-9]+)\((.*?)\)/g, function (e, n, a) {
            t.setFromString(n, a);
          });
        },
        toString: function (e) {
          var t = [];
          for (var n in this)
            if (this.hasOwnProperty(n)) {
              if (
                !p.transform3d &&
                ("rotateX" === n ||
                  "rotateY" === n ||
                  "perspective" === n ||
                  "transformOrigin" === n)
              )
                continue;
              "_" !== n[0] &&
                (e && "scale" === n
                  ? t.push(n + "3d(" + this[n] + ",1)")
                  : e && "translate" === n
                  ? t.push(n + "3d(" + this[n] + ",0)")
                  : t.push(n + "(" + this[n] + ")"));
            }
          return t.join(" ");
        },
      }),
      (e.fn.transition = e.fn.transit =
        function (t, n, a, o) {
          var s = this,
            l = 0,
            d = !0,
            u = e.extend(!0, {}, t);
          "function" == typeof n && ((o = n), (n = void 0)),
            "object" == typeof n &&
              ((a = n.easing),
              (l = n.delay || 0),
              (d = "undefined" == typeof n.queue || n.queue),
              (o = n.complete),
              (n = n.duration)),
            "function" == typeof a && ((o = a), (a = void 0)),
            "undefined" != typeof u.easing && ((a = u.easing), delete u.easing),
            "undefined" != typeof u.duration &&
              ((n = u.duration), delete u.duration),
            "undefined" != typeof u.complete &&
              ((o = u.complete), delete u.complete),
            "undefined" != typeof u.queue && ((d = u.queue), delete u.queue),
            "undefined" != typeof u.delay && ((l = u.delay), delete u.delay),
            "undefined" == typeof n && (n = e.fx.speeds._default),
            "undefined" == typeof a && (a = e.cssEase._default),
            (n = c(n));
          var f = i(u, n, a, l),
            h = e.transit.enabled && p.transition,
            v = h ? parseInt(n, 10) + parseInt(l, 10) : 0;
          if (0 === v) {
            var g = function (e) {
              s.css(u), o && o.apply(s), e && e();
            };
            return r(s, d, g), s;
          }
          var y = {},
            $ = function (t) {
              var n = !1,
                a = function () {
                  n && s.unbind(m, a),
                    v > 0 &&
                      s.each(function () {
                        this.style[p.transition] = y[this] || null;
                      }),
                    "function" == typeof o && o.apply(s),
                    "function" == typeof t && t();
                };
              v > 0 && m && e.transit.useTransitionEnd
                ? ((n = !0), s.bind(m, a))
                : window.setTimeout(a, v),
                s.each(function () {
                  v > 0 && (this.style[p.transition] = f), e(this).css(u);
                });
            },
            b = function (e) {
              this.offsetWidth, $(e);
            };
          return r(s, d, b), this;
        }),
      (e.transit.getTransitionValue = i),
      e
    );
  }),
  "function" != typeof Object.create &&
    (Object.create = function (e) {
      function t() {}
      return (t.prototype = e), new t();
    }),
  (function (e, t, n) {
    var a = {
      init: function (t, n) {
        var a = this;
        (a.$elem = e(n)),
          (a.options = e.extend(
            {},
            e.fn.owlCarousel.options,
            a.$elem.data(),
            t
          )),
          (a.userOptions = t),
          a.loadContent();
      },
      loadContent: function () {
        function t(e) {
          var t,
            n = "";
          if ("function" == typeof a.options.jsonSuccess)
            a.options.jsonSuccess.apply(this, [e]);
          else {
            for (t in e.owl) e.owl.hasOwnProperty(t) && (n += e.owl[t].item);
            a.$elem.html(n);
          }
          a.logIn();
        }
        var n,
          a = this;
        "function" == typeof a.options.beforeInit &&
          a.options.beforeInit.apply(this, [a.$elem]),
          "string" == typeof a.options.jsonPath
            ? ((n = a.options.jsonPath), e.getJSON(n, t))
            : a.logIn();
      },
      logIn: function () {
        var e = this;
        e.$elem.data("owl-originalStyles", e.$elem.attr("style")),
          e.$elem.data("owl-originalClasses", e.$elem.attr("class")),
          e.$elem.css({ opacity: 0 }),
          (e.orignalItems = e.options.items),
          e.checkBrowser(),
          (e.wrapperWidth = 0),
          (e.checkVisible = null),
          e.setVars();
      },
      setVars: function () {
        var e = this;
        return (
          0 !== e.$elem.children().length &&
          (e.baseClass(),
          e.eventTypes(),
          (e.$userItems = e.$elem.children()),
          (e.itemsAmount = e.$userItems.length),
          e.wrapItems(),
          (e.$owlItems = e.$elem.find(".owl-item")),
          (e.$owlWrapper = e.$elem.find(".owl-wrapper")),
          (e.playDirection = "next"),
          (e.prevItem = 0),
          (e.prevArr = [0]),
          (e.currentItem = 0),
          e.customEvents(),
          void e.onStartup())
        );
      },
      onStartup: function () {
        var e = this;
        e.updateItems(),
          e.calculateAll(),
          e.buildControls(),
          e.updateControls(),
          e.response(),
          e.moveEvents(),
          e.stopOnHover(),
          e.owlStatus(),
          e.options.transitionStyle !== !1 &&
            e.transitionTypes(e.options.transitionStyle),
          e.options.autoPlay === !0 && (e.options.autoPlay = 5e3),
          e.play(),
          e.$elem.find(".owl-wrapper").css("display", "block"),
          e.$elem.is(":visible")
            ? e.$elem.css("opacity", 1)
            : e.watchVisibility(),
          (e.onstartup = !1),
          e.eachMoveUpdate(),
          "function" == typeof e.options.afterInit &&
            e.options.afterInit.apply(this, [e.$elem]);
      },
      eachMoveUpdate: function () {
        var e = this;
        e.options.lazyLoad === !0 && e.lazyLoad(),
          e.options.autoHeight === !0 && e.autoHeight(),
          e.onVisibleItems(),
          "function" == typeof e.options.afterAction &&
            e.options.afterAction.apply(this, [e.$elem]);
      },
      updateVars: function () {
        var e = this;
        "function" == typeof e.options.beforeUpdate &&
          e.options.beforeUpdate.apply(this, [e.$elem]),
          e.watchVisibility(),
          e.updateItems(),
          e.calculateAll(),
          e.updatePosition(),
          e.updateControls(),
          e.eachMoveUpdate(),
          "function" == typeof e.options.afterUpdate &&
            e.options.afterUpdate.apply(this, [e.$elem]);
      },
      reload: function () {
        var e = this;
        t.setTimeout(function () {
          e.updateVars();
        }, 0);
      },
      watchVisibility: function () {
        var e = this;
        return (
          e.$elem.is(":visible") === !1 &&
          (e.$elem.css({ opacity: 0 }),
          t.clearInterval(e.autoPlayInterval),
          t.clearInterval(e.checkVisible),
          void (e.checkVisible = t.setInterval(function () {
            e.$elem.is(":visible") &&
              (e.reload(),
              e.$elem.animate({ opacity: 1 }, 200),
              t.clearInterval(e.checkVisible));
          }, 500)))
        );
      },
      wrapItems: function () {
        var e = this;
        e.$userItems
          .wrapAll('<ul class="owl-wrapper">')
          .wrap('<li class="owl-item"></li>'),
          e.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">'),
          (e.wrapperOuter = e.$elem.find(".owl-wrapper-outer")),
          e.$elem.css("display", "block");
      },
      baseClass: function () {
        var e = this,
          t = e.$elem.hasClass(e.options.baseClass),
          n = e.$elem.hasClass(e.options.theme);
        t || e.$elem.addClass(e.options.baseClass),
          n || e.$elem.addClass(e.options.theme);
      },
      updateItems: function () {
        var t,
          n,
          a = this;
        if (a.options.responsive === !1) return !1;
        if (a.options.singleItem === !0)
          return (
            (a.options.items = a.orignalItems = 1),
            (a.options.itemsCustom = !1),
            (a.options.itemsDesktop = !1),
            (a.options.itemsDesktopSmall = !1),
            (a.options.itemsTablet = !1),
            (a.options.itemsTabletSmall = !1),
            (a.options.itemsMobile = !1),
            !1
          );
        if (
          ((t = e(a.options.responsiveBaseWidth).width()),
          t > (a.options.itemsDesktop[0] || a.orignalItems) &&
            (a.options.items = a.orignalItems),
          a.options.itemsCustom !== !1)
        )
          for (
            a.options.itemsCustom.sort(function (e, t) {
              return e[0] - t[0];
            }),
              n = 0;
            n < a.options.itemsCustom.length;
            n += 1
          )
            a.options.itemsCustom[n][0] <= t &&
              (a.options.items = a.options.itemsCustom[n][1]);
        else
          t <= a.options.itemsDesktop[0] &&
            a.options.itemsDesktop !== !1 &&
            (a.options.items = a.options.itemsDesktop[1]),
            t <= a.options.itemsDesktopSmall[0] &&
              a.options.itemsDesktopSmall !== !1 &&
              (a.options.items = a.options.itemsDesktopSmall[1]),
            t <= a.options.itemsTablet[0] &&
              a.options.itemsTablet !== !1 &&
              (a.options.items = a.options.itemsTablet[1]),
            t <= a.options.itemsTabletSmall[0] &&
              a.options.itemsTabletSmall !== !1 &&
              (a.options.items = a.options.itemsTabletSmall[1]),
            t <= a.options.itemsMobile[0] &&
              a.options.itemsMobile !== !1 &&
              (a.options.items = a.options.itemsMobile[1]);
        a.options.items > a.itemsAmount &&
          a.options.itemsScaleUp === !0 &&
          (a.options.items = a.itemsAmount);
      },
      response: function () {
        var n,
          a,
          r = this;
        return (
          r.options.responsive === !0 &&
          ((a = e(t).width()),
          (r.resizer = function () {
            e(t).width() !== a &&
              (r.options.autoPlay !== !1 && t.clearInterval(r.autoPlayInterval),
              t.clearTimeout(n),
              (n = t.setTimeout(function () {
                (a = e(t).width()), r.updateVars();
              }, r.options.responsiveRefreshRate)));
          }),
          void e(t).resize(r.resizer))
        );
      },
      updatePosition: function () {
        var e = this;
        e.jumpTo(e.currentItem), e.options.autoPlay !== !1 && e.checkAp();
      },
      appendItemsSizes: function () {
        var t = this,
          n = 0,
          a = t.itemsAmount - t.options.items;
        t.$owlItems.each(function (r) {
          var o = e(this);
          o.css({ width: t.itemWidth }).data("owl-item", Number(r)),
            (r % t.options.items !== 0 && r !== a) || r > a || (n += 1),
            o.data("owl-roundPages", n);
        });
      },
      appendWrapperSizes: function () {
        var e = this,
          t = e.$owlItems.length * e.itemWidth;
        e.$owlWrapper.css({ width: 2 * t, left: 0 }), e.appendItemsSizes();
      },
      calculateAll: function () {
        var e = this;
        e.calculateWidth(), e.appendWrapperSizes(), e.loops(), e.max();
      },
      calculateWidth: function () {
        var e = this;
        e.itemWidth = Math.round(e.$elem.width() / e.options.items);
      },
      max: function () {
        var e = this,
          t =
            (e.itemsAmount * e.itemWidth - e.options.items * e.itemWidth) * -1;
        return (
          e.options.items > e.itemsAmount
            ? ((e.maximumItem = 0), (t = 0), (e.maximumPixels = 0))
            : ((e.maximumItem = e.itemsAmount - e.options.items),
              (e.maximumPixels = t)),
          t
        );
      },
      min: function () {
        return 0;
      },
      loops: function () {
        var t,
          n,
          a,
          r = this,
          o = 0,
          i = 0;
        for (
          r.positionsInArray = [0], r.pagesInArray = [], t = 0;
          t < r.itemsAmount;
          t += 1
        )
          (i += r.itemWidth),
            r.positionsInArray.push(-i),
            r.options.scrollPerPage === !0 &&
              ((n = e(r.$owlItems[t])),
              (a = n.data("owl-roundPages")),
              a !== o &&
                ((r.pagesInArray[o] = r.positionsInArray[t]), (o = a)));
      },
      buildControls: function () {
        var t = this;
        (t.options.navigation !== !0 && t.options.pagination !== !0) ||
          (t.owlControls = e('<div class="owl-controls"/>')
            .toggleClass("clickable", !t.browser.isTouch)
            .appendTo(t.$elem)),
          t.options.pagination === !0 && t.buildPagination(),
          t.options.navigation === !0 && t.buildButtons();
      },
      buildButtons: function () {
        var t = this,
          n = e('<div class="owl-buttons"/>');
        t.owlControls.append(n),
          (t.buttonPrev = e("<div/>", {
            class: "owl-prev",
            html: t.options.navigationText[0] || "",
          })),
          (t.buttonNext = e("<div/>", {
            class: "owl-next",
            html: t.options.navigationText[1] || "",
          })),
          n.append(t.buttonPrev).append(t.buttonNext),
          n.on(
            "touchstart.owlControls mousedown.owlControls",
            'div[class^="owl"]',
            function (e) {
              e.preventDefault();
            }
          ),
          n.on(
            "touchend.owlControls mouseup.owlControls",
            'div[class^="owl"]',
            function (n) {
              n.preventDefault(),
                e(this).hasClass("owl-next") ? t.next() : t.prev();
            }
          );
      },
      buildPagination: function () {
        var t = this;
        (t.paginationWrapper = e('<div class="owl-pagination"/>')),
          t.owlControls.append(t.paginationWrapper),
          t.paginationWrapper.on(
            "touchend.owlControls mouseup.owlControls",
            ".owl-page",
            function (n) {
              n.preventDefault(),
                Number(e(this).data("owl-page")) !== t.currentItem &&
                  t.goTo(Number(e(this).data("owl-page")), !0);
            }
          );
      },
      updatePagination: function () {
        var t,
          n,
          a,
          r,
          o,
          i,
          s = this;
        if (s.options.pagination === !1) return !1;
        for (
          s.paginationWrapper.html(""),
            t = 0,
            n = s.itemsAmount - (s.itemsAmount % s.options.items),
            r = 0;
          r < s.itemsAmount;
          r += 1
        )
          r % s.options.items === 0 &&
            ((t += 1),
            n === r && (a = s.itemsAmount - s.options.items),
            (o = e("<div/>", { class: "owl-page" })),
            (i = e("<span></span>", {
              text: s.options.paginationNumbers === !0 ? t : "",
              class: s.options.paginationNumbers === !0 ? "owl-numbers" : "",
            })),
            o.append(i),
            o.data("owl-page", n === r ? a : r),
            o.data("owl-roundPages", t),
            s.paginationWrapper.append(o));
        s.checkPagination();
      },
      checkPagination: function () {
        var t = this;
        return (
          t.options.pagination !== !1 &&
          void t.paginationWrapper.find(".owl-page").each(function () {
            e(this).data("owl-roundPages") ===
              e(t.$owlItems[t.currentItem]).data("owl-roundPages") &&
              (t.paginationWrapper.find(".owl-page").removeClass("active"),
              e(this).addClass("active"));
          })
        );
      },
      checkNavigation: function () {
        var e = this;
        return (
          e.options.navigation !== !1 &&
          void (
            e.options.rewindNav === !1 &&
            (0 === e.currentItem && 0 === e.maximumItem
              ? (e.buttonPrev.addClass("disabled"),
                e.buttonNext.addClass("disabled"))
              : 0 === e.currentItem && 0 !== e.maximumItem
              ? (e.buttonPrev.addClass("disabled"),
                e.buttonNext.removeClass("disabled"))
              : e.currentItem === e.maximumItem
              ? (e.buttonPrev.removeClass("disabled"),
                e.buttonNext.addClass("disabled"))
              : 0 !== e.currentItem &&
                e.currentItem !== e.maximumItem &&
                (e.buttonPrev.removeClass("disabled"),
                e.buttonNext.removeClass("disabled")))
          )
        );
      },
      updateControls: function () {
        var e = this;
        e.updatePagination(),
          e.checkNavigation(),
          e.owlControls &&
            (e.options.items >= e.itemsAmount
              ? e.owlControls.hide()
              : e.owlControls.show());
      },
      destroyControls: function () {
        var e = this;
        e.owlControls && e.owlControls.remove();
      },
      next: function (e) {
        var t = this;
        if (t.isTransition) return !1;
        if (
          ((t.currentItem +=
            t.options.scrollPerPage === !0 ? t.options.items : 1),
          t.currentItem >
            t.maximumItem +
              (t.options.scrollPerPage === !0 ? t.options.items - 1 : 0))
        ) {
          if (t.options.rewindNav !== !0)
            return (t.currentItem = t.maximumItem), !1;
          (t.currentItem = 0), (e = "rewind");
        }
        t.goTo(t.currentItem, e);
      },
      prev: function (e) {
        var t = this;
        if (t.isTransition) return !1;
        if (
          (t.options.scrollPerPage === !0 &&
          t.currentItem > 0 &&
          t.currentItem < t.options.items
            ? (t.currentItem = 0)
            : (t.currentItem -=
                t.options.scrollPerPage === !0 ? t.options.items : 1),
          t.currentItem < 0)
        ) {
          if (t.options.rewindNav !== !0) return (t.currentItem = 0), !1;
          (t.currentItem = t.maximumItem), (e = "rewind");
        }
        t.goTo(t.currentItem, e);
      },
      goTo: function (e, n, a) {
        var r,
          o = this;
        return (
          !o.isTransition &&
          ("function" == typeof o.options.beforeMove &&
            o.options.beforeMove.apply(this, [o.$elem]),
          e >= o.maximumItem ? (e = o.maximumItem) : e <= 0 && (e = 0),
          (o.currentItem = o.owl.currentItem = e),
          o.options.transitionStyle !== !1 &&
          "drag" !== a &&
          1 === o.options.items &&
          o.browser.support3d === !0
            ? (o.swapSpeed(0),
              o.browser.support3d === !0
                ? o.transition3d(o.positionsInArray[e])
                : o.css2slide(o.positionsInArray[e], 1),
              o.afterGo(),
              o.singleItemTransition(),
              !1)
            : ((r = o.positionsInArray[e]),
              o.browser.support3d === !0
                ? ((o.isCss3Finish = !1),
                  n === !0
                    ? (o.swapSpeed("paginationSpeed"),
                      t.setTimeout(function () {
                        o.isCss3Finish = !0;
                      }, o.options.paginationSpeed))
                    : "rewind" === n
                    ? (o.swapSpeed(o.options.rewindSpeed),
                      t.setTimeout(function () {
                        o.isCss3Finish = !0;
                      }, o.options.rewindSpeed))
                    : (o.swapSpeed("slideSpeed"),
                      t.setTimeout(function () {
                        o.isCss3Finish = !0;
                      }, o.options.slideSpeed)),
                  o.transition3d(r))
                : n === !0
                ? o.css2slide(r, o.options.paginationSpeed)
                : "rewind" === n
                ? o.css2slide(r, o.options.rewindSpeed)
                : o.css2slide(r, o.options.slideSpeed),
              void o.afterGo()))
        );
      },
      jumpTo: function (e) {
        var t = this;
        "function" == typeof t.options.beforeMove &&
          t.options.beforeMove.apply(this, [t.$elem]),
          e >= t.maximumItem || e === -1
            ? (e = t.maximumItem)
            : e <= 0 && (e = 0),
          t.swapSpeed(0),
          t.browser.support3d === !0
            ? t.transition3d(t.positionsInArray[e])
            : t.css2slide(t.positionsInArray[e], 1),
          (t.currentItem = t.owl.currentItem = e),
          t.afterGo();
      },
      afterGo: function () {
        var e = this;
        e.prevArr.push(e.currentItem),
          (e.prevItem = e.owl.prevItem = e.prevArr[e.prevArr.length - 2]),
          e.prevArr.shift(0),
          e.prevItem !== e.currentItem &&
            (e.checkPagination(),
            e.checkNavigation(),
            e.eachMoveUpdate(),
            e.options.autoPlay !== !1 && e.checkAp()),
          "function" == typeof e.options.afterMove &&
            e.prevItem !== e.currentItem &&
            e.options.afterMove.apply(this, [e.$elem]);
      },
      stop: function () {
        var e = this;
        (e.apStatus = "stop"), t.clearInterval(e.autoPlayInterval);
      },
      checkAp: function () {
        var e = this;
        "stop" !== e.apStatus && e.play();
      },
      play: function () {
        var e = this;
        return (
          (e.apStatus = "play"),
          e.options.autoPlay !== !1 &&
            (t.clearInterval(e.autoPlayInterval),
            void (e.autoPlayInterval = t.setInterval(function () {
              e.next(!0);
            }, e.options.autoPlay)))
        );
      },
      swapSpeed: function (e) {
        var t = this;
        "slideSpeed" === e
          ? t.$owlWrapper.css(t.addCssSpeed(t.options.slideSpeed))
          : "paginationSpeed" === e
          ? t.$owlWrapper.css(t.addCssSpeed(t.options.paginationSpeed))
          : "string" != typeof e && t.$owlWrapper.css(t.addCssSpeed(e));
      },
      addCssSpeed: function (e) {
        return {
          "-webkit-transition": "all " + e + "ms ease",
          "-moz-transition": "all " + e + "ms ease",
          "-o-transition": "all " + e + "ms ease",
          transition: "all " + e + "ms ease",
        };
      },
      removeTransition: function () {
        return {
          "-webkit-transition": "",
          "-moz-transition": "",
          "-o-transition": "",
          transition: "",
        };
      },
      doTranslate: function (e) {
        return {
          "-webkit-transform": "translate3d(" + e + "px, 0px, 0px)",
          "-moz-transform": "translate3d(" + e + "px, 0px, 0px)",
          "-o-transform": "translate3d(" + e + "px, 0px, 0px)",
          "-ms-transform": "translate3d(" + e + "px, 0px, 0px)",
          transform: "translate3d(" + e + "px, 0px,0px)",
        };
      },
      transition3d: function (e) {
        var t = this;
        t.$owlWrapper.css(t.doTranslate(e));
      },
      css2move: function (e) {
        var t = this;
        t.$owlWrapper.css({ left: e });
      },
      css2slide: function (e, t) {
        var n = this;
        (n.isCssFinish = !1),
          n.$owlWrapper.stop(!0, !0).animate(
            { left: e },
            {
              duration: t || n.options.slideSpeed,
              complete: function () {
                n.isCssFinish = !0;
              },
            }
          );
      },
      checkBrowser: function () {
        var e,
          a,
          r,
          o,
          i = this,
          s = "translate3d(0px, 0px, 0px)",
          l = n.createElement("div");
        (l.style.cssText =
          "  -moz-transform:" +
          s +
          "; -ms-transform:" +
          s +
          "; -o-transform:" +
          s +
          "; -webkit-transform:" +
          s +
          "; transform:" +
          s),
          (e = /translate3d\(0px, 0px, 0px\)/g),
          (a = l.style.cssText.match(e)),
          (r = null !== a && 1 === a.length),
          (o = "ontouchstart" in t || t.navigator.msMaxTouchPoints),
          (i.browser = { support3d: r, isTouch: o });
      },
      moveEvents: function () {
        var e = this;
        (e.options.mouseDrag === !1 && e.options.touchDrag === !1) ||
          (e.gestures(), e.disabledEvents());
      },
      eventTypes: function () {
        var e = this,
          t = ["s", "e", "x"];
        (e.ev_types = {}),
          e.options.mouseDrag === !0 && e.options.touchDrag === !0
            ? (t = [
                "touchstart.owl mousedown.owl",
                "touchmove.owl mousemove.owl",
                "touchend.owl touchcancel.owl mouseup.owl",
              ])
            : e.options.mouseDrag === !1 && e.options.touchDrag === !0
            ? (t = [
                "touchstart.owl",
                "touchmove.owl",
                "touchend.owl touchcancel.owl",
              ])
            : e.options.mouseDrag === !0 &&
              e.options.touchDrag === !1 &&
              (t = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]),
          (e.ev_types.start = t[0]),
          (e.ev_types.move = t[1]),
          (e.ev_types.end = t[2]);
      },
      disabledEvents: function () {
        var t = this;
        t.$elem.on("dragstart.owl", function (e) {
          e.preventDefault();
        }),
          t.$elem.on("mousedown.disableTextSelect", function (t) {
            return e(t.target).is("input, textarea, select, option");
          });
      },
      gestures: function () {
        function a(e) {
          if (void 0 !== e.touches)
            return { x: e.touches[0].pageX, y: e.touches[0].pageY };
          if (void 0 === e.touches) {
            if (void 0 !== e.pageX) return { x: e.pageX, y: e.pageY };
            if (void 0 === e.pageX) return { x: e.clientX, y: e.clientY };
          }
        }
        function r(t) {
          "on" === t
            ? (e(n).on(l.ev_types.move, i), e(n).on(l.ev_types.end, s))
            : "off" === t &&
              (e(n).off(l.ev_types.move), e(n).off(l.ev_types.end));
        }
        function o(n) {
          var o,
            i = n.originalEvent || n || t.event;
          if (3 === i.which) return !1;
          if (!(l.itemsAmount <= l.options.items)) {
            if (l.isCssFinish === !1 && !l.options.dragBeforeAnimFinish)
              return !1;
            if (l.isCss3Finish === !1 && !l.options.dragBeforeAnimFinish)
              return !1;
            l.options.autoPlay !== !1 && t.clearInterval(l.autoPlayInterval),
              l.browser.isTouch === !0 ||
                l.$owlWrapper.hasClass("grabbing") ||
                l.$owlWrapper.addClass("grabbing"),
              (l.newPosX = 0),
              (l.newRelativeX = 0),
              e(this).css(l.removeTransition()),
              (o = e(this).position()),
              (d.relativePos = o.left),
              (d.offsetX = a(i).x - o.left),
              (d.offsetY = a(i).y - o.top),
              r("on"),
              (d.sliding = !1),
              (d.targetElement = i.target || i.srcElement);
          }
        }
        function i(r) {
          var o,
            i,
            s = r.originalEvent || r || t.event;
          (l.newPosX = a(s).x - d.offsetX),
            (l.newPosY = a(s).y - d.offsetY),
            (l.newRelativeX = l.newPosX - d.relativePos),
            "function" == typeof l.options.startDragging &&
              d.dragging !== !0 &&
              0 !== l.newRelativeX &&
              ((d.dragging = !0), l.options.startDragging.apply(l, [l.$elem])),
            (l.newRelativeX > 8 || l.newRelativeX < -8) &&
              l.browser.isTouch === !0 &&
              (void 0 !== s.preventDefault
                ? s.preventDefault()
                : (s.returnValue = !1),
              (d.sliding = !0)),
            (l.newPosY > 10 || l.newPosY < -10) &&
              d.sliding === !1 &&
              e(n).off("touchmove.owl"),
            (o = function () {
              return l.newRelativeX / 5;
            }),
            (i = function () {
              return l.maximumPixels + l.newRelativeX / 5;
            }),
            (l.newPosX = Math.max(Math.min(l.newPosX, o()), i())),
            l.browser.support3d === !0
              ? l.transition3d(l.newPosX)
              : l.css2move(l.newPosX);
        }
        function s(n) {
          var a,
            o,
            i,
            s = n.originalEvent || n || t.event;
          (s.target = s.target || s.srcElement),
            (d.dragging = !1),
            l.browser.isTouch !== !0 && l.$owlWrapper.removeClass("grabbing"),
            l.newRelativeX < 0
              ? (l.dragDirection = l.owl.dragDirection = "left")
              : (l.dragDirection = l.owl.dragDirection = "right"),
            0 !== l.newRelativeX &&
              ((a = l.getNewPosition()),
              l.goTo(a, !1, "drag"),
              d.targetElement === s.target &&
                l.browser.isTouch !== !0 &&
                (e(s.target).on("click.disable", function (t) {
                  t.stopImmediatePropagation(),
                    t.stopPropagation(),
                    t.preventDefault(),
                    e(t.target).off("click.disable");
                }),
                (o = e._data(s.target, "events").click),
                (i = o.pop()),
                o.splice(0, 0, i))),
            r("off");
        }
        var l = this,
          d = {
            offsetX: 0,
            offsetY: 0,
            baseElWidth: 0,
            relativePos: 0,
            position: null,
            minSwipe: null,
            maxSwipe: null,
            sliding: null,
            dargging: null,
            targetElement: null,
          };
        (l.isCssFinish = !0), l.$elem.on(l.ev_types.start, ".owl-wrapper", o);
      },
      getNewPosition: function () {
        var e = this,
          t = e.closestItem();
        return (
          t > e.maximumItem
            ? ((e.currentItem = e.maximumItem), (t = e.maximumItem))
            : e.newPosX >= 0 && ((t = 0), (e.currentItem = 0)),
          t
        );
      },
      closestItem: function () {
        var t = this,
          n =
            t.options.scrollPerPage === !0
              ? t.pagesInArray
              : t.positionsInArray,
          a = t.newPosX,
          r = null;
        return (
          e.each(n, function (o, i) {
            a - t.itemWidth / 20 > n[o + 1] &&
            a - t.itemWidth / 20 < i &&
            "left" === t.moveDirection()
              ? ((r = i),
                t.options.scrollPerPage === !0
                  ? (t.currentItem = e.inArray(r, t.positionsInArray))
                  : (t.currentItem = o))
              : a + t.itemWidth / 20 < i &&
                a + t.itemWidth / 20 > (n[o + 1] || n[o] - t.itemWidth) &&
                "right" === t.moveDirection() &&
                (t.options.scrollPerPage === !0
                  ? ((r = n[o + 1] || n[n.length - 1]),
                    (t.currentItem = e.inArray(r, t.positionsInArray)))
                  : ((r = n[o + 1]), (t.currentItem = o + 1)));
          }),
          t.currentItem
        );
      },
      moveDirection: function () {
        var e,
          t = this;
        return (
          t.newRelativeX < 0
            ? ((e = "right"), (t.playDirection = "next"))
            : ((e = "left"), (t.playDirection = "prev")),
          e
        );
      },
      customEvents: function () {
        var e = this;
        e.$elem.on("owl.next", function () {
          e.next();
        }),
          e.$elem.on("owl.prev", function () {
            e.prev();
          }),
          e.$elem.on("owl.play", function (t, n) {
            (e.options.autoPlay = n), e.play(), (e.hoverStatus = "play");
          }),
          e.$elem.on("owl.stop", function () {
            e.stop(), (e.hoverStatus = "stop");
          }),
          e.$elem.on("owl.goTo", function (t, n) {
            e.goTo(n);
          }),
          e.$elem.on("owl.jumpTo", function (t, n) {
            e.jumpTo(n);
          });
      },
      stopOnHover: function () {
        var e = this;
        e.options.stopOnHover === !0 &&
          e.browser.isTouch !== !0 &&
          e.options.autoPlay !== !1 &&
          (e.$elem.on("mouseover", function () {
            e.stop();
          }),
          e.$elem.on("mouseout", function () {
            "stop" !== e.hoverStatus && e.play();
          }));
      },
      lazyLoad: function () {
        var t,
          n,
          a,
          r,
          o,
          i = this;
        if (i.options.lazyLoad === !1) return !1;
        for (t = 0; t < i.itemsAmount; t += 1)
          (n = e(i.$owlItems[t])),
            "loaded" !== n.data("owl-loaded") &&
              ((a = n.data("owl-item")),
              (r = n.find(".lazyOwl")),
              "string" == typeof r.data("src")
                ? (void 0 === n.data("owl-loaded") &&
                    (r.hide(),
                    n.addClass("loading").data("owl-loaded", "checked")),
                  (o = i.options.lazyFollow !== !0 || a >= i.currentItem),
                  o &&
                    a < i.currentItem + i.options.items &&
                    r.length &&
                    i.lazyPreload(n, r))
                : n.data("owl-loaded", "loaded"));
      },
      lazyPreload: function (e, n) {
        function a() {
          e.data("owl-loaded", "loaded").removeClass("loading"),
            n.removeAttr("data-src"),
            "fade" === i.options.lazyEffect ? n.fadeIn(400) : n.show(),
            "function" == typeof i.options.afterLazyLoad &&
              i.options.afterLazyLoad.apply(this, [i.$elem]);
        }
        function r() {
          (s += 1),
            i.completeImg(n.get(0)) || o === !0
              ? a()
              : s <= 100
              ? t.setTimeout(r, 100)
              : a();
        }
        var o,
          i = this,
          s = 0;
        "DIV" === n.prop("tagName")
          ? (n.css("background-image", "url(" + n.data("src") + ")"), (o = !0))
          : (n[0].src = n.data("src")),
          r();
      },
      autoHeight: function () {
        function n() {
          var n = e(o.$owlItems[o.currentItem]).height();
          o.wrapperOuter.css("height", n + "px"),
            o.wrapperOuter.hasClass("autoHeight") ||
              t.setTimeout(function () {
                o.wrapperOuter.addClass("autoHeight");
              }, 0);
        }
        function a() {
          (r += 1),
            o.completeImg(i.get(0))
              ? n()
              : r <= 100
              ? t.setTimeout(a, 100)
              : o.wrapperOuter.css("height", "");
        }
        var r,
          o = this,
          i = e(o.$owlItems[o.currentItem]).find("img");
        void 0 !== i.get(0) ? ((r = 0), a()) : n();
      },
      completeImg: function (e) {
        var t;
        return (
          !!e.complete &&
          ((t = typeof e.naturalWidth),
          "undefined" === t || 0 !== e.naturalWidth)
        );
      },
      onVisibleItems: function () {
        var t,
          n = this;
        for (
          n.options.addClassActive === !0 && n.$owlItems.removeClass("active"),
            n.visibleItems = [],
            t = n.currentItem;
          t < n.currentItem + n.options.items;
          t += 1
        )
          n.visibleItems.push(t),
            n.options.addClassActive === !0 &&
              e(n.$owlItems[t]).addClass("active");
        n.owl.visibleItems = n.visibleItems;
      },
      transitionTypes: function (e) {
        var t = this;
        (t.outClass = "owl-" + e + "-out"), (t.inClass = "owl-" + e + "-in");
      },
      singleItemTransition: function () {
        function e(e) {
          return { position: "relative", left: e + "px" };
        }
        var t = this,
          n = t.outClass,
          a = t.inClass,
          r = t.$owlItems.eq(t.currentItem),
          o = t.$owlItems.eq(t.prevItem),
          i =
            Math.abs(t.positionsInArray[t.currentItem]) +
            t.positionsInArray[t.prevItem],
          s = Math.abs(t.positionsInArray[t.currentItem]) + t.itemWidth / 2,
          l = "webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend";
        (t.isTransition = !0),
          t.$owlWrapper.addClass("owl-origin").css({
            "-webkit-transform-origin": s + "px",
            "-moz-perspective-origin": s + "px",
            "perspective-origin": s + "px",
          }),
          o
            .css(e(i, 10))
            .addClass(n)
            .on(l, function () {
              (t.endPrev = !0), o.off(l), t.clearTransStyle(o, n);
            }),
          r.addClass(a).on(l, function () {
            (t.endCurrent = !0), r.off(l), t.clearTransStyle(r, a);
          });
      },
      clearTransStyle: function (e, t) {
        var n = this;
        e.css({ position: "", left: "" }).removeClass(t),
          n.endPrev &&
            n.endCurrent &&
            (n.$owlWrapper.removeClass("owl-origin"),
            (n.endPrev = !1),
            (n.endCurrent = !1),
            (n.isTransition = !1));
      },
      owlStatus: function () {
        var e = this;
        e.owl = {
          userOptions: e.userOptions,
          baseElement: e.$elem,
          userItems: e.$userItems,
          owlItems: e.$owlItems,
          currentItem: e.currentItem,
          prevItem: e.prevItem,
          visibleItems: e.visibleItems,
          isTouch: e.browser.isTouch,
          browser: e.browser,
          dragDirection: e.dragDirection,
        };
      },
      clearEvents: function () {
        var a = this;
        a.$elem.off(".owl owl mousedown.disableTextSelect"),
          e(n).off(".owl owl"),
          e(t).off("resize", a.resizer);
      },
      unWrap: function () {
        var e = this;
        0 !== e.$elem.children().length &&
          (e.$owlWrapper.unwrap(),
          e.$userItems.unwrap().unwrap(),
          e.owlControls && e.owlControls.remove()),
          e.clearEvents(),
          e.$elem
            .attr("style", e.$elem.data("owl-originalStyles") || "")
            .attr("class", e.$elem.data("owl-originalClasses"));
      },
      destroy: function () {
        var e = this;
        e.stop(),
          t.clearInterval(e.checkVisible),
          e.unWrap(),
          e.$elem.removeData();
      },
      reinit: function (t) {
        var n = this,
          a = e.extend({}, n.userOptions, t);
        n.unWrap(), n.init(a, n.$elem);
      },
      addItem: function (e, t) {
        var n,
          a = this;
        return (
          !!e &&
          (0 === a.$elem.children().length
            ? (a.$elem.append(e), a.setVars(), !1)
            : (a.unWrap(),
              (n = void 0 === t || t === -1 ? -1 : t),
              n >= a.$userItems.length || n === -1
                ? a.$userItems.eq(-1).after(e)
                : a.$userItems.eq(n).before(e),
              void a.setVars()))
        );
      },
      removeItem: function (e) {
        var t,
          n = this;
        return (
          0 !== n.$elem.children().length &&
          ((t = void 0 === e || e === -1 ? -1 : e),
          n.unWrap(),
          n.$userItems.eq(t).remove(),
          void n.setVars())
        );
      },
    };
    (e.fn.owlCarousel = function (t) {
      return this.each(function () {
        if (e(this).data("owl-init") === !0) return !1;
        e(this).data("owl-init", !0);
        var n = Object.create(a);
        n.init(t, this), e.data(this, "owlCarousel", n);
      });
    }),
      (e.fn.owlCarousel.options = {
        items: 5,
        itemsCustom: !1,
        itemsDesktop: [1199, 4],
        itemsDesktopSmall: [979, 3],
        itemsTablet: [768, 2],
        itemsTabletSmall: !1,
        itemsMobile: [479, 1],
        singleItem: !1,
        itemsScaleUp: !1,
        slideSpeed: 200,
        paginationSpeed: 800,
        rewindSpeed: 1e3,
        autoPlay: !1,
        stopOnHover: !1,
        navigation: !1,
        navigationText: ["prev", "next"],
        rewindNav: !0,
        scrollPerPage: !1,
        pagination: !0,
        paginationNumbers: !1,
        responsive: !0,
        responsiveRefreshRate: 200,
        responsiveBaseWidth: t,
        baseClass: "owl-carousel",
        theme: "owl-theme",
        lazyLoad: !1,
        lazyFollow: !0,
        lazyEffect: "fade",
        autoHeight: !1,
        jsonPath: !1,
        jsonSuccess: !1,
        dragBeforeAnimFinish: !0,
        mouseDrag: !0,
        touchDrag: !0,
        addClassActive: !1,
        transitionStyle: !1,
        beforeUpdate: !1,
        afterUpdate: !1,
        beforeInit: !1,
        afterInit: !1,
        beforeMove: !1,
        afterMove: !1,
        afterAction: !1,
        startDragging: !1,
        afterLazyLoad: !1,
      });
  })(jQuery, window, document);
var stopTrigger,
  ignoreFood = !1;
window.onpopstate = function (e) {
  e.state
    ? loadFoodPanel()
    : ($(".js-open_infopanel").removeClass("activeLink"),
      $(".InfoPanel").fadeOut(),
      $("#Carousel").fadeIn());
};
var ignoreBecauseOfBack = !1,
  optionIds = new Array(),
  request = null,
  pushStateActive,
  ignorePushState,
  panelOpen = !1,
  orders = {};
!(function (e) {
  var t = !1;
  if (
    ("function" == typeof define && define.amd && (define(e), (t = !0)),
    "object" == typeof exports && ((module.exports = e()), (t = !0)),
    !t)
  ) {
    var n = window.Cookies,
      a = (window.Cookies = e());
    a.noConflict = function () {
      return (window.Cookies = n), a;
    };
  }
})(function () {
  function e() {
    for (var e = 0, t = {}; e < arguments.length; e++) {
      var n = arguments[e];
      for (var a in n) t[a] = n[a];
    }
    return t;
  }
  function t(n) {
    function a(t, r, o) {
      var i;
      if ("undefined" != typeof document) {
        if (arguments.length > 1) {
          if (
            ((o = e({ path: "/" }, a.defaults, o)),
            "number" == typeof o.expires)
          ) {
            var s = new Date();
            s.setMilliseconds(s.getMilliseconds() + 864e5 * o.expires),
              (o.expires = s);
          }
          try {
            (i = JSON.stringify(r)), /^[\{\[]/.test(i) && (r = i);
          } catch (l) {}
          return (
            (r = n.write
              ? n.write(r, t)
              : encodeURIComponent(String(r)).replace(
                  /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
                  decodeURIComponent
                )),
            (t = encodeURIComponent(String(t))),
            (t = t.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)),
            (t = t.replace(/[\(\)]/g, escape)),
            (document.cookie = [
              t,
              "=",
              r,
              o.expires ? "; expires=" + o.expires.toUTCString() : "",
              o.path ? "; path=" + o.path : "",
              o.domain ? "; domain=" + o.domain : "",
              o.secure ? "; secure" : "",
            ].join(""))
          );
        }
        t || (i = {});
        for (
          var d = document.cookie ? document.cookie.split("; ") : [],
            c = /(%[0-9A-Z]{2})+/g,
            u = 0;
          u < d.length;
          u++
        ) {
          var p = d[u].split("="),
            f = p.slice(1).join("=");
          '"' === f.charAt(0) && (f = f.slice(1, -1));
          try {
            var h = p[0].replace(c, decodeURIComponent);
            if (
              ((f = n.read
                ? n.read(f, h)
                : n(f, h) || f.replace(c, decodeURIComponent)),
              this.json)
            )
              try {
                f = JSON.parse(f);
              } catch (l) {}
            if (t === h) {
              i = f;
              break;
            }
            t || (i[h] = f);
          } catch (l) {}
        }
        return i;
      }
    }
    return (
      (a.set = a),
      (a.get = function (e) {
        return a.call(a, e);
      }),
      (a.getJSON = function () {
        return a.apply({ json: !0 }, [].slice.call(arguments));
      }),
      (a.defaults = {}),
      (a.remove = function (t, n) {
        a(t, "", e(n, { expires: -1 }));
      }),
      (a.withConverter = t),
      a
    );
  }
  return t(function () {});
}),
  (function (e) {
    e.fn.clam = function () {
      function t(t) {
        function n() {
          (d = a()), d === g && s(), p.click(r);
        }
        function a() {
          return void 0 !== h && Cookies.set(m) === g ? g : y;
        }
        function r(e) {
          e.preventDefault(), v || (d === g ? l() : s());
        }
        function o() {
          Cookies.set(m, d, { expires: 365 });
        }
        function i(e, t) {
          f.transition({ height: e }, c, function () {
            (v = !1), t();
          });
        }
        function s() {
          (v = !0), (d = g), o(), u.addClass($), f.show();
          var e = f.height();
          f.height(0),
            i(e, function () {
              f.height("");
            });
        }
        function l() {
          (v = !0),
            (d = y),
            o(),
            f.height(f.height()),
            i(0, function () {
              u.removeClass($), f.hide(), f.height("");
            });
        }
        var d,
          c = e.support.transition ? "ease-in-out" : "swing",
          u = e(t),
          p = u.find("> :first-child"),
          f = u.find("> :last-child"),
          h = u.attr("id"),
          m = "clam-" + h,
          v = !1,
          g = "opened",
          y = "closed",
          $ = "active";
        n();
      }
      var n = [];
      return (
        e(this).each(function () {
          n.push(t(this));
        }),
        this
      );
    };
  })(jQuery),
  $(".OpenMenu, .CloseMenu").click(function () {
    $(".Header, .Content, .Footer, .GoogleMapsIframe").toggleClass("js-onside");
  }),
  $(document).on("click", ".Accordion-title", function () {
    $(".Accordion-title").removeClass("active"), $(this).addClass("active");
  }),
  $(document).on("click", ".AccordionWide-title", function () {
    $(".AccordionWide-title").removeClass("active"), $(this).addClass("active");
  });
var clamAnimating = !1;
if (
  ($(function () {
    $(".js-clamshell").click(function () {
      if (!clamAnimating)
        if (
          (($element = $(this)),
          ($body = $element.find("> :last-child")),
          (clamAnimating = !0),
          $(this).hasClass("active"))
        )
          $body.height($body.height()),
            animate($body, 0, function () {
              $element.removeClass("active"), $body.hide(), $body.height("");
            });
        else {
          $(".js-clamshell").each(function () {
            $(this).find("> :last-child").hide(),
              $(this).find("> :last-child").height(""),
              $(this).removeClass("active");
          }),
            $element.addClass("active"),
            $body.show();
          var e = $body.height();
          $body.height(0),
            animate($body, e, function () {
              $body.height("");
            });
        }
    });
  }),
  $(document).on("click", ".openReviews", function () {
    var e = $(".DetailsPanel-inner.is-active .Reviews"),
      t = $(e).offset().top;
    $(".DetailsPanel").animate({ scrollTop: t }, 500),
      $(".Accordion-title").removeClass("active"),
      $(e).addClass("active");
  }),
  $(".js-back_to_top").click(function () {
    var e = $("body").offset().top;
    $("html:not(:animated),body:not(:animated)").animate({ scrollTop: e }, 1e3);
  }),
  $(".js-scroll_to").click(function () {
    var e = $(this).attr("href").replace(/!/, ""),
      t = $(e).offset().top;
    $("html:not(:animated),body:not(:animated)").animate({ scrollTop: t }, 1e3);
  }),
  $(".showForm").click(function () {
    if (($(".hiddenForm").slideDown(), winWidth < 768)) {
      var e = $(".hiddenForm").offset().top;
      $("html:not(:animated),body:not(:animated)").animate(
        { scrollTop: e - 60 },
        1e3
      );
    }
  }),
  $(".showInput").click(function () {
    var e = $(this).val();
    $("." + e + "Input").slideDown();
  }),
  $(".js-next").on("click", function () {
    var e = ($(window).scrollTop(), $(this).parents(".js-section")),
      t = e.next(),
      n = t.offset().top;
    $("html:not(:animated),body:not(:animated)").animate({ scrollTop: n }, 1e3);
  }),
  $('.selectionBox input[type="radio"]').change(function () {
    $(".selectionBox").removeClass("selectedBox"),
      $(this).is(":checked") && $(this).parent().addClass("selectedBox");
  }),
  $("#orderForm").length)
)
  var winHeight = $(window).height(),
    orderBottom =
      $("#orderForm").offset().top + $("#orderForm").outerHeight(!0);
$(".AccordionWide-title").click(function () {
  setTimeout(function () {
    orderBottom =
      $("#orderForm").offset().top + $("#orderForm").outerHeight(!0) + 135;
  }, 100);
}),
  $(document).ready(function () {
    function e(e) {
      for (var t = !1, n = document.cookie.split(";"), a = 0; a < n.length; a++)
        if (n[a].trim().startsWith("bannerid")) {
          var r = n[a].substring(n[a].indexOf("=") + 1);
          console.log(r), r == e && (t = !0);
        }
      return t;
    }
    (winWidth =
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") == -1
        ? $(window).width()
        : window.innerWidth),
      /Android|webOS|iPhone|iPad|iPod|Mobile|BlackBerry/i.test(
        navigator.userAgent
      ) || $(".ipados-hack").is(":visible")
        ? $("body").addClass("touch")
        : $("body").addClass("notouch"),
      pageImages(),
      canvasHeight(),
      storyFade(),
      pageNav(),
      foodcategory_info(),
      details_panel(),
      shops(),
      setup_orderform(),
      info_panel(),
      order_calculator(),
      vouchers(),
      loadFoodPanel(),
      ingredients_options(),
      careersPage(),
      $(".closeCPPrompt").click(function () {
        $("#cpPrompt").hide();
      }),
      $(document).on("cut copy paste", "#confirmContactEmail", function (e) {
        e.preventDefault();
      }),
      $("#siteBanner").length > 0 &&
        "" != $("#bannerId").val() &&
        (e($("#bannerId").val())
          ? $(".Site").removeClass("banner-showing")
          : $("#siteBanner").removeClass("c-site-banner--hidden")),
      $(".c-show-ingredients-personalisation").click(function () {
        $(this).toggleClass("csi-active"),
          $(".c-ingredients-message").toggleClass("hiddenForm");
      }),
      $(document).ready(function () {
        $("#contactSubmitButton").click(function (e) {
          $("#captchaInputValid").addClass("hiddenForm"),
            $("#captchaInputValid").removeClass("Incomplete"),
            e.preventDefault();
          var t = grecaptcha.getResponse();
          0 == t.length
            ? ($("#captchaInputValid").removeClass("hiddenForm"),
              $("#captchaInputValid").addClass("Incomplete"),
              alert("please enter a capcha"))
            : ($("#reCaptcha").val(grecaptcha.getResponse()),
              $("#contactForm").submit());
        }),
          $("#pLink1").click(function () {
            $(this).addClass("active"),
              $("#pLink2").removeClass("active"),
              $("#infoImg1").addClass("active"),
              $("#infoImg2").removeClass("active");
          }),
          $("#pLink2").click(function () {
            $(this).addClass("active"),
              $("#pLink1").removeClass("active"),
              $("#infoImg2").addClass("active"),
              $("#infoImg1").removeClass("active");
          });
      }),
      $("#bannerLink").click(function () {
        (document.cookie =
          "bannerid=" + $("#bannerId").val() + "; max-age=2147483647"),
          (window.location.href = $("#bannerLink").data("href"));
      }),
      $("#closeBanner, #closeBannerMobile").click(function () {
        $("#siteBanner").addClass("c-site-banner--hidden"),
          $(".Site").removeClass("banner-showing"),
          $(".Site .Canvas").addClass("with-transitions"),
          $(".Site .Canvas").css("background-position-y", 0),
          $(".basketBuyModule-container").css("top", "0px"),
          (document.cookie =
            "bannerid=" + $("#bannerId").val() + "; max-age=2147483647");
      }),
      $("#Carousel").owlCarousel({
        items: 3,
        itemsDesktop: !1,
        itemsDesktopSmall: !1,
        itemsTablet: [1023, 2],
        itemsTabletSmall: !1,
        itemsMobile: [767, 1],
        lazyLoad: !0,
        navigation: !0,
      }),
      $(".asciiFilter").keyup("input", function (e) {
        $(this).val(
          $(this)
            .val()
            .replace(/[^\x00-\x7F]/g, "")
        );
      }),
      $("#selectProductGrid")
        .find("img")
        .each(function () {
          if ($(this).data("lazyload")) {
            var e = $(this),
              t = new Image();
            (t.onload = function () {
              e.attr("src", e.data("lazyload")),
                e.show(),
                e.animate({ opacity: 1 }),
                e.next().show();
            }),
              (t.src = $(this).data("lazyload"));
          }
        }),
      $("#sendPasswordResetForm").submit(function () {
        return $("#hiddenUsername").val($("#email").val()), !0;
      }),
      $("#productContent").length > 0 &&
        "" != $("#productContent").data("ingcode") &&
        inlineIngredients($("#productContent").data("ingcode"));
  }),
  $(document).on("touchstart", bannerHack),
  $(document).on("touchend", bannerHack),
  $(document).on("touchmove", bannerHack),
  $(document).scroll(function () {
    var e = window.navigator.userAgent;
    e.match(/iPad/i) || e.match(/iPhone/i) || e.match(/Mobile/i)
      ? ($(".Canvas").addClass("isMobileSafari"), bannerHack())
      : (bannerHack(), storyFade(), pageNav(), Stick());
  }),
  $(window).resize(function () {
    (winWidth =
      navigator.userAgent.indexOf("Safari") != -1 &&
      navigator.userAgent.indexOf("Chrome") == -1
        ? $(window).width()
        : window.innerWidth),
      canvasHeight(),
      pageNav(),
      bannerHack();
  });
var redeemedVouchers = new Array(),
  nextVoucherId = 1;
if (
  ($(function () {
    function e() {
      var e = $("#vacancySearch").val(),
        t = $("#sRole option:selected").text(),
        n = $("#sLocation option:selected").text();
      $(".u-search-visible").each(function () {
        $(this).removeClass("u-force-highlight--odd"),
          $(this).removeClass("u-force-highlight--even"),
          $(this).removeClass("u-force-highlight--first");
      }),
        "undefined" != typeof e && e.length > 0
          ? $(".vacancy-filter").is(":visible")
            ? $(".lookup-table__mobile").each(function () {
                !$(this)
                  .data("searchable")
                  .toLowerCase()
                  .includes(e.toLowerCase()) ||
                ("Role" != t && t != $(this).data("role")) ||
                ("Location" != n && n != $(this).data("location"))
                  ? ($(this).addClass("u-search-hidden"),
                    $(this).removeClass("u-search-visible"))
                  : ($(this).removeClass("u-search-hidden"),
                    $(this).addClass("u-search-visible"));
              })
            : $(".lookup-table__row").each(function () {
                !$(this)
                  .data("searchable")
                  .toLowerCase()
                  .includes(e.toLowerCase()) ||
                ("Role" != t && t != $(this).data("role")) ||
                ("Location" != n && n != $(this).data("location"))
                  ? ($(this).addClass("u-search-hidden"),
                    $(this).removeClass("u-search-visible"))
                  : ($(this).removeClass("u-search-hidden"),
                    $(this).addClass("u-search-visible"));
              })
          : $(".vacancy-filter").is(":visible")
          ? $(".lookup-table__mobile").each(function () {
              ("Role" != t && t != $(this).data("role")) ||
              ("Location" != n && n != $(this).data("location"))
                ? ($(this).addClass("u-search-hidden"),
                  $(this).removeClass("u-search-visible"))
                : ($(this).removeClass("u-search-hidden"),
                  $(this).addClass("u-search-visible"));
            })
          : $(".lookup-table__row").each(function () {
              ("Role" != t && t != $(this).data("role")) ||
              ("Location" != n && n != $(this).data("location"))
                ? ($(this).addClass("u-search-hidden"),
                  $(this).removeClass("u-search-visible"))
                : ($(this).removeClass("u-search-hidden"),
                  $(this).addClass("u-search-visible"));
            });
      var a = "u-force-highlight--even",
        r = !0;
      $(".u-search-visible").each(function () {
        r && ($(this).addClass("u-force-highlight--first"), (r = !1)),
          $(this).addClass(a),
          (a =
            "u-force-highlight--even" == a
              ? "u-force-highlight--odd"
              : "u-force-highlight--even");
      });
    }
    $("#latestVacanciesButton").click(function () {
      $("html, body").animate(
        { scrollTop: $("#latestVacanciesPanel").offset().top },
        1e3
      );
    }),
      $("#mLocation, #mRole").change(function () {
        $("#sRole").val($("#mRole").val()),
          $("#sLocation").val($("#mLocation").val()),
          e();
      }),
      $("#sLocation, #sRole").change(function () {
        e();
      }),
      $("#vacancySearch").keyup(function () {
        e();
      }),
      $(".lookup-table__row, .lookup-table__mobile").click(function () {
        window.location.href = "/vacancy/" + $(this).data("id");
      }),
      $("#acceptTerms").click(function () {
        $("#termsIncUnder").is(":visible") && $("#termsIncUnder").hide();
      });
  }),
  null !== document.querySelector("#preview") &&
    (Dropzone.options.myDropzone = {
      uploadMultiple: !1,
      parallelUploads: 1,
      maxFilesize: 5,
      acceptedFiles: ".pdf, .docx, .doc",
      dictCancelUpload: "Remove file",
      previewTemplate: document.querySelector("#preview").innerHTML,
      addRemoveLinks: !0,
      dictRemoveFile: "Remove file",
      dictFileTooBig: "File is larger than 5MB",
      timeout: 1e4,
      init: function () {
        this.on("removedfile", function (e) {
          $.ajax({
            url: "/removecv",
            method: "POST",
            dataType: "json",
            data: {
              id: $("#uploadId").val(),
              _token: $('[name="_csrftoken"]').val(),
            },
            success: function (e) {
              $(".dz-message").show();
            },
            error: function (e, t) {
              $(".dz-message").show();
            },
          });
        });
      },
      success: function (e, t) {
        console.log(t),
          $(".dz-message").hide(),
          (document.getElementById("uploadId").value = t.id),
          (document.getElementById("uploadErrorHeader").style.display = "none"),
          (document.getElementById("uploadError").style.display = "none"),
          $("#uploadValidation").removeClass("Incomplete"),
          $("#uploadValidation").addClass("hiddenForm");
      },
      error: function (e, t) {
        console.log(t),
          this.removeFile(e),
          (document.getElementById("uploadError").innerHTML = t.error),
          (document.getElementById("uploadErrorHeader").style.display =
            "block"),
          (document.getElementById("uploadError").style.display =
            "inline-block");
      },
    }),
  void 0 === window.SIMMONS)
)
  var SIMMONS = {};
(SIMMONS.allergenInfo = (function () {
  "use strict";
  function e() {
    var e = document.getElementById("js-allergen-info-open-button");
    e && (t(e), n());
  }
  function t(e) {
    (c = $("body")),
      (s = $("#js-allergen-info")),
      (l = $(e)),
      (d = $("#js-allergen-info-close-button"));
  }
  function n() {
    l.click(a), d.click(r);
  }
  function a(e) {
    e.preventDefault(), f === p && o();
  }
  function r(e) {
    e.preventDefault(), f === u && i();
  }
  function o() {
    s.addClass(h), c.addClass(m), (f = u);
  }
  function i() {
    s.removeClass(h), c.removeClass(m), (f = p);
  }
  var s,
    l,
    d,
    c,
    u = "opened",
    p = "closed",
    f = p,
    h = "is-open",
    m = "is-allergyInfoOpen";
  return { init: e };
})()),
  jQuery(function () {
    SIMMONS.allergenInfo.init();
  });
var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  rsIdx = restrictedClickAndCollect.length,
  bfIdx = restrictedBuffets.length;
(restrictedClickAndCollect[rsIdx++] = new Date(2019, 11, 26)),
  (restrictedClickAndCollect[rsIdx++] = new Date(2019, 11, 27)),
  (restrictedBuffets[bfIdx++] = new Date(2019, 11, 24)),
  (restrictedBuffets[bfIdx++] = new Date(2019, 11, 27)),
  (restrictedBuffets[bfIdx++] = new Date(2019, 11, 28)),
  (restrictedBuffets[bfIdx++] = new Date(2019, 11, 29)),
  (restrictedBuffets[bfIdx++] = new Date(2019, 11, 30)),
  (restrictedBuffets[bfIdx++] = new Date(2019, 11, 31));
var SimmonsCalendar;
$(function () {
  "use strict";
  (SimmonsCalendar = {
    currentMonth: 1,
    currentDay: 1,
    currentYear: 2012,
    deliverySelectionDate: null,
    init: function () {
      $(".PrevMonthButton").click(function () {
        SimmonsCalendar.lastMonth();
      }),
        $(".NextMonthButton").click(function () {
          SimmonsCalendar.nextMonth();
        }),
        $("#deliveryForm").submit(function () {
          var e = $("#orderType").val();
          if (
            ("candcproducts" == e &&
              ($("#errorText").html("Please select a collection date."),
              $("#deliveryForm").attr("action", "/guestaddress")),
            SimmonsCalendar.withPersonalised())
          ) {
            var t = !0,
              n = !0;
            if (
              ($(".personaliseMessage").each(function () {
                if ($(this).val().length > 0) {
                  var e = $(this).attr("data-ref-id");
                  if ("select" == $("#colour_" + e).val()) return (t = !1), !1;
                  if (
                    $("#personaliseMessage_" + e).val().length >
                    $("#personaliseMessage_" + e).attr("maxlength")
                  )
                    return (n = !1), !1;
                }
              }),
              0 == t)
            )
              return (
                $("#errorText").html("Please select a colour."),
                $("#js-displayError").removeClass("hiddenForm"),
                $("html, body").animate(
                  {
                    scrollTop:
                      $("#js-displayError").offset().top -
                      parseInt($(".Header").height()),
                  },
                  200
                ),
                !1
              );
            if (0 == n)
              return (
                $("#errorText").html(
                  "Message cannot be more than the stated number of characters."
                ),
                $("#js-displayError").removeClass("hiddenForm"),
                $("html, body").animate(
                  {
                    scrollTop:
                      $("#js-displayError").offset().top -
                      parseInt($(".Header").height()),
                  },
                  200
                ),
                !1
              );
          }
          return SimmonsCalendar.validateSelection();
        }),
        $(".personaliseMessage").blur(function () {
          "" != $(this).val() &&
            $("#personaliseAlert_" + $(this).data("validation-ref")).show();
        }),
        $(".personaliseMessage").keydown(function (e) {
          8 != event.keyCode &&
            46 != event.keyCode &&
            (($(this).val().length != $(this).attr("maxlength") &&
              10 != event.keyCode &&
              13 != event.keyCode) ||
              e.preventDefault());
        }),
        $(".noThanks").click(function () {
          var e = $(this).attr("data-ref-id");
          $("#personalise_" + e).hide(),
            $("textarea[name='personaliseMessage_" + e + "']").val(""),
            $("select[name='colour_" + e + "']").val("select");
          var t = !1;
          $(".personaliseArea").each(function () {
            $(this).is(":visible") && (t = !0);
          }),
            t || $("#personaliseForm").submit();
        });
      var e = new Date();
      SimmonsCalendar.setupAndDisplay(e);
    },
    setupAndDisplay: function (e) {
      var t = e.getDate(),
        n = e.getMonth(),
        a = e.getFullYear();
      (SimmonsCalendar.currentDay = t),
        (SimmonsCalendar.currentMonth = n),
        (SimmonsCalendar.currentYear = a),
        SimmonsCalendar.displayCalendar();
    },
    daysOfMonth: function (e, t) {
      var n;
      return (
        0 == e || 2 == e || 4 == e || 6 == e || 7 == e || 9 == e || 11 == e
          ? (n = 31)
          : 3 == e || 5 == e || 8 == e || 10 == e
          ? (n = 30)
          : 1 == e &&
            (n = (t % 4 == 0 && t % 100 != 0) || t % 400 == 0 ? 29 : 28),
        n
      );
    },
    nextMonth: function () {
      var e = new Date();
      if (
        (SimmonsCalendar.currentYear == e.getFullYear() &&
          SimmonsCalendar.currentMonth < e.getMonth() + 2) ||
        (SimmonsCalendar.currentYear == e.getFullYear() + 1 &&
          11 == e.getMonth() &&
          0 == SimmonsCalendar.currentMonth)
      ) {
        var t = new Date(
          SimmonsCalendar.currentYear,
          SimmonsCalendar.currentMonth,
          1
        );
        t.setMonth(t.getMonth() + 1), SimmonsCalendar.setupAndDisplay(t);
      }
    },
    lastMonth: function () {
      var e = new Date();
      if (
        SimmonsCalendar.currentMonth > e.getMonth() ||
        SimmonsCalendar.currentYear > e.getFullYear()
      ) {
        var t = new Date(
          SimmonsCalendar.currentYear,
          SimmonsCalendar.currentMonth,
          1
        );
        t.setMonth(t.getMonth() - 1), SimmonsCalendar.setupAndDisplay(t);
      }
    },
    validateSelection: function () {
      return (
        "" != $("#deliveryDay").val() ||
        ($("#js-displayError").removeClass("hiddenForm"),
        $("html, body").animate(
          {
            scrollTop:
              $("#js-displayError").offset().top -
              parseInt($(".Header").height()),
          },
          200
        ),
        !1)
      );
    },
    easterSunday: function (e) {
      var t = Math.floor(e / 100),
        n = e - 19 * Math.floor(e / 19),
        a = Math.floor((t - 17) / 25),
        r = t - Math.floor(t / 4) - Math.floor((t - a) / 3) + 19 * n + 15;
      (r -= 30 * Math.floor(r / 30)),
        (r -=
          Math.floor(r / 28) *
          (1 -
            Math.floor(r / 28) *
              Math.floor(29 / (r + 1)) *
              Math.floor((21 - n) / 11)));
      var o = e + Math.floor(e / 4) + r + 2 - t + Math.floor(t / 4);
      o -= 7 * Math.floor(o / 7);
      var i = r - o,
        s = 3 + Math.floor((i + 40) / 44),
        l = i + 28 - 31 * Math.floor(s / 4);
      return new Date(e, s - 1, l, 0, 0, 0, 0);
    },
    easterMonday: function (e, t, n) {
      var a = SimmonsCalendar.easterSunday(n);
      return (
        a.setDate(a.getDate() + 1),
        e == a.getDate() && t == a.getMonth() && n == a.getFullYear()
      );
    },
    christmasDayBankHoliday: function (e, t, n) {
      var a = new Date(n, 11, 25, 0, 0, 0, 0);
      return (
        (e == a.getDate() && t == a.getMonth() && n == a.getFullYear()) ||
        (6 == a.getDay()
          ? a.setDate(a.getDate() + 2)
          : 0 == a.getDay() && a.setDate(a.getDate() + 1),
        e == a.getDate() && t == a.getMonth() && n == a.getFullYear())
      );
    },
    boxingDayBankHoliday: function (e, t, n) {
      var a = new Date(n, 11, 26, 0, 0, 0, 0);
      return (
        (e == a.getDate() && t == a.getMonth() && n == a.getFullYear()) ||
        (6 == a.getDay()
          ? a.setDate(a.getDate() + 2)
          : 0 == a.getDay()
          ? a.setDate(a.getDate() + 2)
          : 1 == a.getDay() && a.setDate(a.getDate() + 1),
        e == a.getDate() && t == a.getMonth() && n == a.getFullYear())
      );
    },
    newYearsBankHoliday: function (e, t, n) {
      var a = new Date(n, 0, 1, 0, 0, 0, 0);
      return (
        6 == a.getDay()
          ? a.setDate(a.getDate() + 2)
          : 0 == a.getDay() && a.setDate(a.getDate() + 1),
        e == a.getDate() && t == a.getMonth() && n == a.getFullYear()
      );
    },
    mayBankHoliday: function (e, t, n) {
      for (var a = new Date(n, 4, 1, 0, 0, 0, 0); ; ) {
        if (1 == a.getDay()) break;
        a.setDate(a.getDate() + 1);
      }
      return e == a.getDate() && t == a.getMonth() && n == a.getFullYear();
    },
    springBankHoliday: function (e, t, n) {
      for (
        var a = new Date(n, 4, 1, 0, 0, 0, 0),
          r = new Date(n, 4, 1, 0, 0, 0, 0);
        ;

      ) {
        if (r.getMonth() > 4) break;
        1 == r.getDay() && (a = new Date(n, 4, r.getDate(), 0, 0, 0, 0)),
          r.setDate(r.getDate() + 1);
      }
      return e == a.getDate() && t == a.getMonth() && n == a.getFullYear();
    },
    augustBankHoliday: function (e, t, n) {
      for (
        var a = new Date(n, 4, 1, 0, 0, 0, 0),
          r = new Date(n, 7, 1, 0, 0, 0, 0);
        ;

      ) {
        if (r.getMonth() > 7) break;
        1 == r.getDay() && (a = new Date(n, 7, r.getDate(), 0, 0, 0, 0)),
          r.setDate(r.getDate() + 1);
      }
      return e == a.getDate() && t == a.getMonth() && n == a.getFullYear();
    },
    isRestrictedClickAndCollect: function (e, t, n) {
      var a = $("#orderType").val();
      if ("candcproducts" == a)
        for (var r = 0; r < restrictedClickAndCollect.length; r++) {
          var o = restrictedClickAndCollect[r];
          if (o.getDate() == e && o.getMonth() == t && o.getFullYear() == n)
            return !0;
        }
      return !1;
    },
    isRestrictedBuffets: function (e, t, n) {
      var a = $("#orderType").val();
      if ("buffetproducts" == a)
        for (var r = 0; r < restrictedBuffets.length; r++) {
          var o = restrictedBuffets[r];
          if (o.getDate() == e && o.getMonth() == t && o.getFullYear() == n)
            return !0;
        }
      return !1;
    },
    isBankHoliday: function (e) {
      return (
        SimmonsCalendar.easterMonday(
          e.getDate(),
          e.getMonth(),
          e.getFullYear()
        ) ||
        SimmonsCalendar.christmasDayBankHoliday(
          e.getDate(),
          e.getMonth(),
          e.getFullYear()
        ) ||
        SimmonsCalendar.boxingDayBankHoliday(
          e.getDate(),
          e.getMonth(),
          e.getFullYear()
        ) ||
        SimmonsCalendar.newYearsBankHoliday(
          e.getDate(),
          e.getMonth(),
          e.getFullYear()
        ) ||
        SimmonsCalendar.mayBankHoliday(
          e.getDate(),
          e.getMonth(),
          e.getFullYear()
        ) ||
        SimmonsCalendar.springBankHoliday(
          e.getDate(),
          e.getMonth(),
          e.getFullYear()
        ) ||
        SimmonsCalendar.augustBankHoliday(
          e.getDate(),
          e.getMonth(),
          e.getFullYear()
        ) ||
        SimmonsCalendar.isRestrictedClickAndCollect(
          e.getDate(),
          e.getMonth(),
          e.getFullYear()
        ) ||
        SimmonsCalendar.isRestrictedBuffets(
          e.getDate(),
          e.getMonth(),
          e.getFullYear()
        )
      );
    },
    initSelection: function (e) {
      var t = !1;
      $(".Day-item").each(function () {
        var n = parseInt($(this).data("datetime"));
        1 == n && (t = !0),
          t &&
            e == n &&
            ($("#deliveryDay").val($(this).data("datetime")),
            $("#deliveryMonth").val(SimmonsCalendar.currentMonth + 1),
            $("#deliveryYear").val(SimmonsCalendar.currentYear),
            (SimmonsCalendar.deliverySelectionDate = $(this)),
            $(this).children(":first").addClass("Delivery"));
      });
    },
    daysUnavailableCss: function (e) {
      var t = !1,
        n = 0,
        a = 0,
        r = 0,
        o = 0,
        i = 0,
        s = 0;
      if ($("#unavailableFrom").length > 0) {
        var l = $("#unavailableFrom").val(),
          d = l.split("-"),
          c = new Date(d[0], d[1] - 1, d[2]);
        (n = c.getDate()), (a = c.getMonth()), (r = c.getFullYear());
      }
      if ($("#unavailableTo").length > 0) {
        var u = $("#unavailableTo").val(),
          d = u.split("-"),
          p = new Date(d[0], d[1] - 1, d[2]);
        (o = p.getDate()), (i = p.getMonth()), (s = p.getFullYear());
      }
      if (
        (n > 0 && o > 0 && (t = !0),
        e.getFullYear() >= r &&
          e.getFullYear() <= s &&
          e.getMonth() >= a &&
          e.getMonth() <= i)
      )
        if (e.getMonth() == a && e.getMonth() == i) {
          if (e.getDate() >= n && e.getDate() <= o) return " Refurbishment";
        } else {
          if (e.getDate() >= n && e.getMonth() == a) return " Refurbishment";
          if (e.getDate() <= o && e.getMonth() == i) return " Refurbishment";
          if (e.getMonth() != a && e.getMonth() != i) return " Refurbishment";
        }
      return "";
    },
    adjustForNextDateAvailable: function (e) {
      return (
        "buffetproducts" == $("#orderType").val()
          ? 4 == e.getDay()
            ? e.getHours() >= 14 && e.setDate(e.getDate() + 2)
            : 5 == e.getDay()
            ? (e.setDate(e.getDate() + 2),
              e.getHours() >= 14 && e.setDate(e.getDate() + 1))
            : 6 == e.getDay()
            ? e.setDate(e.getDate() + 2)
            : e.getHours() >= 14 && e.setDate(e.getDate() + 1)
          : 21 == e.getDate() &&
            11 == e.getMonth() &&
            2018 == e.getFullYear() &&
            e.getHours() >= 14
          ? e.setDate(e.getDate() + 1)
          : 22 == e.getDate() &&
            11 == e.getMonth() &&
            2018 == e.getFullYear() &&
            e.getHours() >= 14
          ? e.setDate(e.getDate() + 1)
          : 23 == e.getDate() &&
            11 == e.getMonth() &&
            2018 == e.getFullYear() &&
            e.getHours() >= 14
          ? e.setDate(e.getDate() + 1)
          : e.getHours() >= 14 && e.setDate(e.getDate() + 1),
        e
      );
    },
    displayCalendar: function () {
      $("#calendarMonth").html(monthNames[SimmonsCalendar.currentMonth] + " "),
        $("#calendarYear").html(SimmonsCalendar.currentYear);
      var e = $("#daysClosed").val(),
        t = [];
      e && "" != e && (t = e.split(","));
      for (var n = 0; n < t.length; n++)
        switch ((console.log(t[n]), parseInt(t[n]))) {
          case 1:
            $("#headerMon").addClass("Closed");
            break;
          case 2:
            $("#headerTue").addClass("Closed");
            break;
          case 3:
            $("#headerWed").addClass("Closed");
            break;
          case 4:
            $("#headerThu").addClass("Closed");
            break;
          case 5:
            $("#headerFri").addClass("Closed");
            break;
          case 6:
            $("#headerSat").addClass("Closed");
            break;
          case 7:
            $("#headerSun").addClass("Closed");
        }
      var a = "",
        r = SimmonsCalendar.daysOfMonth(
          SimmonsCalendar.currentMonth,
          SimmonsCalendar.currentYear
        ),
        o =
          (SimmonsCalendar.currentYear,
          new Date(
            SimmonsCalendar.currentYear,
            SimmonsCalendar.currentMonth,
            1
          )),
        i = o.getDay();
      0 == i && (i = 7), o.setMonth(o.getMonth() - 1);
      var s = SimmonsCalendar.daysOfMonth(o.getMonth(), o.getYear());
      (a += '<li class="Month-previous">'), (a += '<ol class="Day-list">');
      for (var l = 0, d = s - (i - 2), c = 1; c < i; c++, l++) {
        o.setDate(d);
        for (var u = "", n = 0; n < t.length; n++)
          if (o.getDay() == t[n]) {
            u += " Closed";
            break;
          }
        (u += SimmonsCalendar.daysUnavailableCss(o)),
          (SimmonsCalendar.isBankHoliday(o) ||
            0 == o.getDay() ||
            1 == o.getDay()) &&
            (u += " Closed"),
          (a +=
            '<li class="Day-item" data-datetime="' +
            d +
            '"><a class="Day-link Last-month' +
            u +
            '">' +
            d++ +
            "</a></li>");
      }
      (a += "</ol>"),
        (a += "</li>"),
        (a += '<li class="Month-current">'),
        (a += '<ol class="Day-list">');
      for (var p = new Date(), c = 1; c <= r; c++, l++) {
        var u = "",
          f = "",
          h = new Date(
            SimmonsCalendar.currentYear,
            SimmonsCalendar.currentMonth,
            c
          ),
          m = new Date();
        (0 == h.getDay() ||
          1 == h.getDay() ||
          SimmonsCalendar.isBankHoliday(h) ||
          (15 == h.getDate() &&
            3 == h.getMonth() &&
            2017 == h.getFullYear() &&
            "buffetproducts" == $("#orderType").val())) &&
          (("candcproducts" == $("#orderType").val() &&
            23 == h.getDate() &&
            11 == h.getMonth() &&
            2018 == h.getFullYear()) ||
            (u += " Closed")),
          (u += SimmonsCalendar.daysUnavailableCss(h));
        for (var n = 0; n < t.length; n++)
          if (h.getDay() == t[n]) {
            u += " Closed";
            break;
          }
        var m = new Date();
        parseInt($(this).data("datetime"));
        (m = SimmonsCalendar.adjustForNextDateAvailable(m)),
          SimmonsCalendar.withPersonalised() &&
            ("buffetproducts" == $("#orderType").val()
              ? 5 != m.getDay() && m.setDate(m.getDate() + 1)
              : 0 != m.getDay()),
          c <= m.getDate() &&
            SimmonsCalendar.currentMonth == m.getMonth() &&
            SimmonsCalendar.currentYear == m.getFullYear() &&
            (u += " Past"),
          h.getYear() == p.getYear() &&
            h.getMonth() == p.getMonth() &&
            h.getDate() == p.getDate() &&
            (f += " Today"),
          (a +=
            '<li class="Day-item' +
            f +
            '" data-datetime="' +
            h.getDate() +
            '"><a class="Day-link' +
            u +
            '">' +
            c +
            "</a></li>");
      }
      if (((a += "</ol>"), (a += "</li>"), l < 42)) {
        (a += '<li class="Month-next">'), (a += '<ol class="Day-list">');
        for (var c = 1; l < 42; c++, l++) {
          (u = ""), (f = "");
          var v = new Date(
            SimmonsCalendar.currentYear,
            SimmonsCalendar.currentMonth,
            c
          );
          v.setDate(v.getDate() + r),
            (0 == v.getDay() ||
              1 == v.getDay() ||
              SimmonsCalendar.isBankHoliday(v)) &&
              (u += "Closed"),
            (u += SimmonsCalendar.daysUnavailableCss(h));
          for (var n = 0; n < t.length; n++)
            if (v.getDay() == t[n]) {
              u += " Closed";
              break;
            }
          a +=
            '<li class="Day-item' +
            f +
            '" data-datetime="' +
            c +
            '"><a class="Day-link Next-month ' +
            u +
            '">' +
            c +
            "</a></li>";
        }
        (a += "</ol>"), (a += "</li>");
      }
      $("#daysOfMonth").html(a),
        $(".Day-item").click(function () {
          if (
            0 == $(this).children(":first").hasClass("Closed") &&
            0 == $(this).children(":first").hasClass("Refurbishment")
          ) {
            var e = !1,
              t = new Date(),
              n = parseInt($(this).data("datetime"));
            if (
              (((SimmonsCalendar.currentYear == t.getFullYear() &&
                SimmonsCalendar.currentMonth == t.getMonth() + 2) ||
                (SimmonsCalendar.currentYear == t.getFullYear() + 1 &&
                  1 == SimmonsCalendar.currentMonth &&
                  11 == t.getMonth()) ||
                (SimmonsCalendar.currentYear == t.getFullYear() + 1 &&
                  0 == SimmonsCalendar.currentMonth &&
                  10 == t.getMonth())) &&
                (e = !0),
              $(this).children(":first").hasClass("Next-month") && e)
            )
              return;
            if (
              0 == $(this).children(":first").hasClass("Next-month") &&
              0 == $(this).children(":first").hasClass("Last-month")
            )
              (t = SimmonsCalendar.adjustForNextDateAvailable(t)),
                SimmonsCalendar.withPersonalised() &&
                  "buffetproducts" == $("#orderType").val() &&
                  5 != t.getDay() &&
                  t.setDate(t.getDate() + 1),
                ((n > t.getDate() &&
                  SimmonsCalendar.currentMonth == t.getMonth() &&
                  SimmonsCalendar.currentYear == t.getFullYear()) ||
                  (SimmonsCalendar.currentMonth > t.getMonth() &&
                    SimmonsCalendar.currentYear == t.getFullYear()) ||
                  SimmonsCalendar.currentYear > t.getFullYear()) &&
                  ($("#deliveryDay").val($(this).data("datetime")),
                  $("#deliveryMonth").val(SimmonsCalendar.currentMonth + 1),
                  $("#deliveryYear").val(SimmonsCalendar.currentYear),
                  null !== SimmonsCalendar.deliverySelectionDate &&
                    SimmonsCalendar.deliverySelectionDate
                      .children(":first")
                      .removeClass("Delivery"),
                  (SimmonsCalendar.deliverySelectionDate = $(this)),
                  $(this).children(":first").addClass("Delivery"));
            else if (1 == $(this).children(":first").hasClass("Last-month")) {
              if (
                SimmonsCalendar.currentYear > t.getFullYear() ||
                SimmonsCalendar.currentMonth > t.getMonth()
              ) {
                var a = !1,
                  r = $(this).data("datetime");
                SimmonsCalendar.lastMonth(),
                  $(".Day-item").each(function () {
                    r == $(this).data("datetime") &&
                      0 == a &&
                      ((a = !0),
                      $("#deliveryDay").val($(this).data("datetime")),
                      $("#deliveryMonth").val(SimmonsCalendar.currentMonth + 1),
                      $("#deliveryYear").val(SimmonsCalendar.currentYear),
                      (SimmonsCalendar.deliverySelectionDate = $(this)),
                      $(this).children(":first").addClass("Delivery"));
                  });
              }
            } else if (
              1 == $(this).children(":first").hasClass("Next-month") &&
              0 == $(this).children(":first").hasClass("Refurbishment")
            ) {
              if (1 == e) return;
              var a = !1,
                r = $(this).data("datetime");
              SimmonsCalendar.nextMonth(),
                (t = SimmonsCalendar.adjustForNextDateAvailable(t)),
                SimmonsCalendar.withPersonalised() &&
                  ("candcproducts" == $("#orderType").val() &&
                    23 == h.getDate() &&
                    11 == h.getMonth() &&
                    2018 == h.getFullYear() &&
                    t.setDate(t.getDate() + 1),
                  ("buffetproducts" != $("#orderType").val() &&
                    0 == t.getDay()) ||
                    t.setDate(t.getDate() + 1)),
                ((n > t.getDate() &&
                  SimmonsCalendar.currentMonth == t.getMonth() &&
                  SimmonsCalendar.currentYear == t.getFullYear()) ||
                  (SimmonsCalendar.currentMonth > t.getMonth() &&
                    SimmonsCalendar.currentYear == t.getFullYear()) ||
                  SimmonsCalendar.currentYear > t.getFullYear()) &&
                  $(".Day-item").each(function () {
                    r == $(this).data("datetime") &&
                      0 == a &&
                      ((a = !0),
                      $("#deliveryDay").val($(this).data("datetime")),
                      $("#deliveryMonth").val(SimmonsCalendar.currentMonth + 1),
                      $("#deliveryYear").val(SimmonsCalendar.currentYear),
                      (SimmonsCalendar.deliverySelectionDate = $(this)),
                      $(this).children(":first").addClass("Delivery"));
                  });
            }
          }
        });
    },
    withPersonalised: function () {
      var e = !1;
      return "true" == $("#hasPersonalised").val() && (e = !0), e;
    },
  }),
    SimmonsCalendar.init();
});
var addressLookedUp = !1,
  billingAddressLookedUp = !1,
  billingAddressRequired = !1,
  animated = !1;
$(function () {
  function e() {
    if (
      ((F = !1),
      (D = !1),
      (E = !1),
      $("#selectAddress").val("select"),
      $("#shopCollectionId").val(""),
      $('input[name="addresschoice"]').attr("checked", !1),
      $("#js-displayErrorStoreLookup").addClass("hiddenForm"),
      $(".basicsubTitle, #cpHeader, #addressData, #addressDataCP").addClass(
        "storeDataHidden"
      ),
      $(".selectionBox").addClass("storeHidden"),
      (S = new Array(
        "10000 kilometers",
        "10000 kilometers",
        "10000 kilometers"
      )),
      (I = new Array(
        "10000 kilometers",
        "10000 kilometers",
        "10000 kilometers"
      )),
      (x = 0),
      (T = 0),
      (k = $("#enterPostcode").val()),
      isValidPostcode(k))
    ) {
      $(".spinner.hide").show();
      var e = new google.maps.DistanceMatrixService();
      (u = y[x]),
        e.getDistanceMatrix(
          {
            origins: [k + ", UK"],
            destinations: [b[x]],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
            avoidHighways: !1,
            avoidTolls: !1,
          },
          t
        ),
        C.length > 0 &&
          ((p = C[T]),
          e.getDistanceMatrix(
            {
              origins: [k + ", UK"],
              destinations: [w[T]],
              travelMode: google.maps.TravelMode.DRIVING,
              unitSystem: google.maps.UnitSystem.IMPERIAL,
              avoidHighways: !1,
              avoidTolls: !1,
            },
            n
          ));
    } else $("#lookupErrorMessage").html("Please enter a valid postcode."), r();
  }
  function t(e, n) {
    if (n != google.maps.DistanceMatrixStatus.OK)
      $(".spinner.hide").hide(),
        n == google.maps.DistanceMatrixStatus.OVER_QUERY_LIMIT
          ? $("#lookupErrorMessage").html(
              "The Google Maps server is not responding. Please wait a moment and try again."
            )
          : $("#lookupErrorMessage").html(
              "There was an issue with your address - please select a store directly."
            ),
        r();
    else {
      for (
        var a = -1,
          o = -1,
          i = e.originAddresses,
          s = (e.destinationAddresses, 0);
        s < i.length;
        s++
      ) {
        var l = e.rows[s].elements;
        if (1 == l.length && "ZERO_RESULTS" != l[0].status) {
          if ("NOT_FOUND" == l[0].status)
            return (
              $(".spinner.hide").hide(),
              $("#lookupErrorMessage").html("Please enter a valid postcode."),
              void r()
            );
          l[0].distance.text.indexOf("ft") > 0
            ? ((a = parseFloat(l[0].distance.text.replace(",", "")) + " feet"),
              (S[2] = S[1]),
              (S[1] = S[0]),
              (S[0] = a))
            : ((o = parseFloat(l[0].distance.text)),
              (a =
                parseFloat(l[0].distance.text.replace(",", "")) +
                " kilometers"),
              S[0].indexOf("feet") == -1 && parseFloat(a) <= parseFloat(S[0])
                ? ((S[2] = S[1]), (S[1] = S[0]), (S[0] = a))
                : parseFloat(a) <= parseFloat(S[1])
                ? ((S[2] = S[1]), (S[1] = a))
                : parseFloat(a) <= parseFloat(S[2]) && (S[2] = a));
        }
      }
      if (a == -1 && "ZERO_RESULTS" != l[0].status)
        $(".spinner.hide").hide(),
          $("#lookupErrorMessage").html(
            "There was an issue with your address - please select a store directly."
          ),
          r();
      else {
        if (
          ($("#addressData")
            .children()
            .each(function () {
              $(this).attr("data-postcode") == u &&
                ($(this).attr("data-sort", o),
                $(this)
                  .find(".placePin")
                  .each(function () {
                    $(this).html(a);
                  }));
            }),
          ++x < y.length)
        ) {
          var d = new google.maps.DistanceMatrixService();
          (u = y[x]),
            d.getDistanceMatrix(
              {
                origins: [k + ", UK"],
                destinations: [b[x]],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: !1,
                avoidTolls: !1,
              },
              t
            );
        } else {
          (D = !0),
            (E || 0 == C.length) &&
              ($(".spinner.hide").hide(),
              $(".basicsubTitle, #addressData, #addressDataCP").removeClass(
                "storeDataHidden"
              ),
              0 == F &&
                $("#cpHeader, #addressDataCP").addClass("storeDataHidden"));
          var c = $("#addressData").children("li").clone();
          c.sort(function (e, t) {
            var n = 0;
            return (
              $(e).data("sort") > $(t).data("sort")
                ? (n = 1)
                : $(e).data("sort") < $(t).data("sort") && (n = -1),
              n
            );
          }),
            $("#addressData").empty(),
            $("#addressData").append(c),
            $(".selectionBox").off("click"),
            $(".selectionBox").removeClass("selectedBox"),
            $(".selectionBox").click(function () {
              $(this)
                .find('input[name="addresschoice"]')
                .each(function () {
                  $(this).is(":checked") ||
                    ($('input[name="addresschoice"]').attr("checked", !1),
                    $(".selectionBox").removeClass("selectedBox"),
                    $(this).parent().addClass("selectedBox"),
                    $(this).prop("checked", !0),
                    $("#selectAddress").val("select"));
                });
            }),
            $("#addressData")
              .children()
              .each(function () {
                var e = !1,
                  t = 0;
                $(this)
                  .find(".placePin")
                  .each(function () {
                    for (var n = 0; n < 3; n++)
                      if ($(this).html() == S[n]) return (e = !0), void t++;
                  }),
                  e && t < 3 && $(this).removeClass("storeHidden");
              });
        }
      }
    }
  }
  function n(e, t) {
    if (t != google.maps.DistanceMatrixStatus.OK)
      $(".spinner.hide").hide(),
        t == google.maps.DistanceMatrixStatus.OVER_QUERY_LIMIT
          ? $("#lookupErrorMessage").html(
              "The Google Maps server is not responding. Please wait a moment and try again."
            )
          : $("#lookupErrorMessage").html(
              "There was an issue with your address - please select a store directly."
            ),
        r();
    else {
      for (
        var a = -1,
          o = -1,
          i = e.originAddresses,
          s = (e.destinationAddresses, 0);
        s < i.length;
        s++
      ) {
        var l = e.rows[s].elements;
        if ((console.log(l), 1 == l.length && "ZERO_RESULTS" != l[0].status)) {
          if ("NOT_FOUND" == l[0].status)
            return (
              $(".spinner.hide").hide(),
              $("#lookupErrorMessage").html("Please enter a valid postcode."),
              void r()
            );
          l[0].distance.text.indexOf("ft") > 0
            ? ((a = parseFloat(l[0].distance.text.replace(",", "")) + " feet"),
              (I[2] = I[1]),
              (I[1] = I[0]),
              (I[0] = a))
            : ((o = parseFloat(l[0].distance.text)),
              (a =
                parseFloat(l[0].distance.text.replace(",", "")) +
                " kilometers"),
              I[0].indexOf("feet") == -1 && parseFloat(a) <= parseFloat(I[0])
                ? ((I[2] = I[1]), (I[1] = I[0]), (I[0] = a))
                : parseFloat(a) <= parseFloat(I[1])
                ? ((I[2] = I[1]), (I[1] = a))
                : parseFloat(a) <= parseFloat(I[2]) && (I[2] = a));
        }
      }
      if (a == -1 && "ZERO_RESULTS" != l[0].status)
        $(".spinner.hide").hide(),
          $("#lookupErrorMessage").html(
            "There was an issue with your address - please select a store directly."
          ),
          r();
      else {
        if (
          ($("#addressDataCP")
            .children()
            .each(function () {
              $(this).attr("data-postcode") == p &&
                ($(this).attr("data-sort", o),
                $(this)
                  .find(".placePin")
                  .each(function () {
                    $(this).html(a);
                  }));
            }),
          ++T < C.length)
        ) {
          var d = new google.maps.DistanceMatrixService();
          (p = C[T]),
            d.getDistanceMatrix(
              {
                origins: [k + ", UK"],
                destinations: [w[T]],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.IMPERIAL,
                avoidHighways: !1,
                avoidTolls: !1,
              },
              n
            );
        } else {
          (E = !0),
            D &&
              ($(".spinner.hide").hide(),
              $(".basicsubTitle, #addressDataCP, #addressData").removeClass(
                "storeDataHidden"
              ),
              0 == F &&
                $("#cpHeader, #addressDataCP").addClass("storeDataHidden"));
          var c = $("#addressDataCP").children("li").clone();
          c.sort(function (e, t) {
            var n = 0;
            return (
              $(e).data("sort") > $(t).data("sort")
                ? (n = 1)
                : $(e).data("sort") < $(t).data("sort") && (n = -1),
              n
            );
          }),
            $("#addressDataCP").empty(),
            $("#addressDataCP").append(c),
            $(".selectionBox").off("click"),
            $(".selectionBox").removeClass("selectedBox"),
            $(".selectionBox").click(function () {
              $(this)
                .find('input[name="addresschoice"]')
                .each(function () {
                  $(this).is(":checked") ||
                    ($('input[name="addresschoice"]').attr("checked", !1),
                    $(this).parent().addClass("selectedBox"),
                    $(this).prop("checked", !0),
                    $("#selectAddress").val("select"));
                });
            }),
            $("#addressDataCP")
              .children()
              .each(function () {
                var e = !1,
                  t = 0;
                $(this)
                  .find(".placePin")
                  .each(function () {
                    for (var n = 0; n < 3; n++)
                      if ($(this).html() == I[n]) return (e = !0), void t++;
                  }),
                  e && t < 3 && ((F = !0), $(this).removeClass("storeHidden"));
              });
        }
      }
    }
  }
  function a(e) {
    for (var t = !0, n = 0; n < v.length; n++) 0 == e.indexOf(v[n]) && (t = !1);
    for (var n = 0; n < g.length; n++)
      0 == e.indexOf(g[n]) && (isNaN(e.charAt(1)) || (t = !1));
    if (t) {
      var a = new google.maps.DirectionsService();
      a.route(
        {
          origin: h,
          destination: e,
          travelMode: google.maps.TravelMode.DRIVING,
          unitSystem: google.maps.UnitSystem.IMPERIAL,
          provideRouteAlternatives: !0,
          avoidHighways: !1,
          avoidTolls: !1,
        },
        o
      );
    } else $("#distanceErrorMessage").html('Sorry, Simmons does not deliver to this address. To find out more please see our <a class="redLink" href="#">FAQ</a>.'), showError();
  }
  function r() {
    $("#js-displayErrorStoreLookup").removeClass("hiddenForm"),
      $("html, body").animate(
        {
          scrollTop:
            $("#js-displayErrorStoreLookup").offset().top -
            parseInt($(".Header").height()),
        },
        200
      );
  }
  function o(e, t) {
    if ((console.log(e), "NOT_FOUND" == t))
      $("#distanceErrorMessage").html(
        "The address could not be found - please contact the store direct."
      ),
        showError();
    else if ("ZERO_RESULTS" == t)
      $("#distanceErrorMessage").html(
        "There were no routes available for your address - please contact the store direct."
      ),
        showError();
    else if ("OK" != t)
      $("#distanceErrorMessage").html(
        "There was an issue with your address - please contact the store direct."
      ),
        showError();
    else {
      var n =
          e.request.origin.query + " to " + e.request.destination.query + ": ",
        a = 1e6,
        r = -1;
      if (0 == e.routes.length)
        return (
          $("#distanceErrorMessage").html("Please enter a valid postcode."),
          void showError()
        );
      for (var o = 0; o < e.routes.length; o++)
        if (e.routes[o].legs.length > 0) {
          console.log(e.routes[o]);
          var i = e.routes[o].legs[0];
          (n += "Distance " + (o + 1) + " = " + i.distance.text + " "),
            (r =
              i.distance.text.indexOf("ft") > 0
                ? 1
                : parseFloat(i.distance.text)),
            a > r && (a = r);
        }
      $.ajax({
        url: "/loggoogleresponse",
        type: "POST",
        data: { googleResponse: n },
        success: function (e) {},
        error: function (e, t, n) {
          console.log(n);
        },
      }),
        a == -1
          ? ($("#distanceErrorMessage").html(
              "There was an issue with your address - please contact the store direct."
            ),
            showError())
          : a > 25
          ? ($("#distanceErrorMessage").html(
              "Simmons only delivers within 25 kilometers of the bakery - please enter a new address."
            ),
            showError())
          : ($("#deliveryDistance").val(a), (f = !0), $("#" + m).submit());
    }
  }
  function i(e) {
    var t = e.val(),
      n = t.indexOf("@"),
      a = t.lastIndexOf("."),
      r = !0;
    return (
      (n < 1 || a < n + 2 || a + 2 >= t.length) && (r = !1),
      r
        ? (e.prev().removeClass("Incomplete"),
          e.prev().addClass("hiddenForm"),
          e.prev().html("must be completed!"))
        : (e.prev().removeClass("hiddenForm"),
          e.prev().addClass("Incomplete"),
          e.prev().html("enter a valid email!"),
          animated ||
            ((animated = !0),
            $("#js-displayError").removeClass("hiddenForm"),
            $("html, body").animate(
              {
                scrollTop:
                  $("#js-displayError").offset().top -
                  parseInt($(".Header").height()),
              },
              200
            ))),
      r
    );
  }
  function s(e, t) {
    var n = e.val(),
      a = n.indexOf("@"),
      r = n.lastIndexOf("."),
      o = !0;
    return (
      (a < 1 || r < a + 2 || r + 2 >= n.length) && (o = !1),
      o
        ? e.val() != t.val()
          ? ((o = !1),
            e.prev().removeClass("hiddenForm"),
            e.prev().addClass("Incomplete"),
            e.prev().html("emails do not match!"),
            animated ||
              ((animated = !0),
              $("#js-displayError").removeClass("hiddenForm"),
              $("html, body").animate(
                {
                  scrollTop:
                    $("#js-displayError").offset().top -
                    parseInt($(".Header").height()),
                },
                200
              )))
          : (e.prev().removeClass("Incomplete"),
            e.prev().addClass("hiddenForm"),
            e.prev().html("must be completed!"))
        : (e.prev().removeClass("hiddenForm"),
          e.prev().addClass("Incomplete"),
          e.prev().html("enter a valid email!"),
          animated ||
            ((animated = !0),
            $("#js-displayError").removeClass("hiddenForm"),
            $("html, body").animate(
              {
                scrollTop:
                  $("#js-displayError").offset().top -
                  parseInt($(".Header").height()),
              },
              200
            ))),
      o
    );
  }
  function l(e, t) {
    var n = !0;
    return (
      $(e).val() == t
        ? ($(e + "_val").addClass("Incomplete"),
          $(e + "_val").removeClass("hiddenForm"),
          $(e + "_val").html("must be completed!"),
          (n = !1))
        : ($(e + "_val").removeClass("Incomplete"),
          $(e + "_val").addClass("hiddenForm"),
          $(e + "_val").html("must be completed!")),
      n
    );
  }
  function d(e) {
    var t = !0;
    return 1 == $("#inTouch").prop("checked") && (t = validate(e)), t;
  }
  function c(e) {
    var t = !0;
    return 1 == $("#inTouch").prop("checked") && (t = i(e)), t;
  }
  var u,
    p,
    f = !1,
    h = "AL10 0EY",
    m = "guestForm",
    v = new Array("NW", "IG", "SW", "SE", "DA", "EC", "WC"),
    g = new Array("W", "E"),
    y = new Array(),
    b = new Array(),
    C = new Array(),
    w = new Array(),
    x = 0,
    T = 0;
  $("#addressData")
    .children()
    .each(function () {
      (b[x] = new google.maps.LatLng(
        $(this).data("latitude"),
        $(this).data("longitude")
      )),
        $(this)
          .find(".collectionPostcode")
          .each(function () {
            y[x++] = $(this).html();
          });
    }),
    $("#addressDataCP")
      .children()
      .each(function () {
        (w[T] = new google.maps.LatLng(
          $(this).data("latitude"),
          $(this).data("longitude")
        )),
          $(this)
            .find(".collectionPostcode")
            .each(function () {
              C[T++] = $(this).html();
            });
      }),
    $("#lookupContinueButton").click(function () {
      $(":radio[name='addresschoice']").each(function () {
        $(this).prop("checked") &&
          ($("#collectionType").val($(this).data("type")),
          $("#shopCollectionId").val($(this).val()));
      }),
        "" == $("#shopCollectionId").val() &&
          "select" != $("#selectAddress").val() &&
          $("#shopCollectionId").val($("#selectAddress").val()),
        "" != $("#shopCollectionId").val()
          ? ($("#trackedPostcode").val($("#enterPostcode").val()),
            $("#chooseAddress").submit())
          : $("#submitPostcode").submit();
    });
  var k,
    S = new Array("10000 kilometers", "10000 kilometers", "10000 kilometers"),
    I = new Array("10000 kilometers", "10000 kilometers", "10000 kilometers"),
    D = !1,
    E = !1,
    F = !1;
  $("#billing-address").click(function () {
    $("#differentDelivery").is(":visible")
      ? ((billingAddressRequired = !1),
        $("#billingHeader").hide(),
        $("#differentDelivery").hide())
      : ((billingAddressRequired = !0),
        $("#billingHeader").show(),
        $("#differentDelivery").show());
  }),
    (animated = !1),
    $("#guestForm").submit(function (e) {
      if (f) return !0;
      if (((m = "guestForm"), (animated = !1), 0 == addressLookedUp))
        return (
          "candcproducts" == $("#productType").val()
            ? $("#distanceErrorMessage").html(
                "Please confirm your billing address."
              )
            : $("#distanceErrorMessage").html(
                "Please confirm your delivery address."
              ),
          showError(),
          !1
        );
      if (billingAddressRequired && 0 == billingAddressLookedUp)
        return (
          $("#distanceErrorMessage").html(
            "Please confirm your billing address."
          ),
          showError(),
          !1
        );
      var t = $("#postcode");
      if (
        (t.prev().html("must be completed!"),
        validate($("#name")) &
          validate($("#surname")) &
          validate($("#contactPhone")) &
          validate($("#contactEmail")) &
          i($("#contactEmail")) &
          s($("#confirmContactEmail"), $("#contactEmail")) &
          validate($("#address-one")) &
          validate($("#city")) &
          validate($("#postcode")) &
          validatePostCode($("#postcode")))
      )
        if (
          0 == $("#billing-address").is(":checked") &&
          "candcproducts" != $("#productType").val()
        ) {
          if (
            validate($("#alt-address-one")) &
            validate($("#alt-city")) &
            validate($("#alt-postcode")) &
            validatePostCode($("#alt-postcode"))
          ) {
            if ("buffetproducts" != $("#productType").val()) return !0;
            a($("#postcode").val());
          }
        } else {
          if ("buffetproducts" != $("#productType").val()) return !0;
          a($("#postcode").val());
        }
      return !1;
    }),
    $("#selectAddressForm").submit(function () {
      if (f) return !0;
      m = "selectAddressForm";
      var e = document.forms.selectAddressForm.elements.addressId.value;
      return a($("#postCode_" + e).val()), !1;
    }),
    $('input[name="addresschoice"]').click(function () {
      $('input[name="addresschoice"]').each(function () {
        $(this).is(":checked") ||
          ($('input[name="addresschoice"]').attr("checked", !1),
          $(".selectionBox").removeClass("selectedBox"),
          $(this).parent().addClass("selectedBox"),
          $(this).prop("checked", !0));
      });
    }),
    $("#selectAddress").change(function () {
      if ("select" == $(this).val()) $("#shopCollectionId").val("");
      else {
        var e = $(this).val(),
          t = e.substring(0, e.indexOf("_")),
          n = e.substring(e.indexOf("_") + 1);
        "CP" == t
          ? $("#collectionType").val("collectionPoint")
          : $("#collectionType").val("shop"),
          $("#shopCollectionId").val(n),
          $(".selectionBox").removeClass("selectedBox"),
          $('input[name="addresschoice"]').attr("checked", !1);
      }
    }),
    $("#addressLineSelect").change(function () {
      "select" == $(this).val()
        ? $("#continueButton").addClass("hiddenForm")
        : ($("#continueButton").removeClass("hiddenForm"),
          $("#houseNumberOrNameLi").addClass("hiddenForm"),
          showEnterManually(""),
          $("#address-one").val($(this).val()));
    }),
    $("#alt-addressLineSelect").change(function () {
      "select" == $(this).val()
        ? $("#continueButton").addClass("hiddenForm")
        : ($("#continueButton").removeClass("hiddenForm"),
          $("#alt-houseNumberOrNameLi").addClass("hiddenForm"),
          showEnterManually("alt-"),
          $("#alt-address-one").val($(this).val()));
    }),
    $("#addressForm").submit(function () {
      return (
        (animated = !1),
        !!(
          validate($("#address-one")) &
          validate($("#city")) &
          validate($("#postcode")) &
          validatePostCode($("#postcode"))
        )
      );
    }),
    $("#submitPostcode").submit(function () {
      return e(), !1;
    }),
    $("#inTouch").click(function () {
      $("#emailInput").slideDown(), $("#phoneInput").slideDown();
    }),
    $("#notInTouch").click(function () {
      $("#phoneInput").slideUp(), $("#emailInput").slideUp();
    }),
    $("#byPhone").click(function () {
      $("#phoneInput").slideDown(), $("#emailInput").slideUp();
    }),
    $("#byEmail").click(function () {
      $("#emailInput").slideDown(), $("#phoneInput").slideUp();
    }),
    $("#contactForm").submit(function () {
      return (
        (animated = !1),
        !!(
          l("#nature_of_contact", "select") &
          validate($("#firstName")) &
          validate($("#surname")) &
          validate($("#comments")) &
          d($("#phone")) &
          c($("#email"))
        )
      );
    }),
    "" != $("#enterPostcode").val() && $("#submitPostcode").submit();
}),
  $(function () {
    function e() {
      var e = !1,
        t = $("#dobDay").val(),
        n = $("#dobMonth").val(),
        a = $("#dobYear").val();
      if ("-1" == t && "-1" == n && "-1" == a) e = !0;
      else if ("-1" == t || "-1" == n || "-1" == a) e = !1;
      else {
        var t = parseInt($("#dobDay").val()),
          n = parseInt($("#dobMonth").val()),
          a = parseInt($("#dobYear").val());
        if (9 == n || 4 == n || 6 == n || 11 == n) 31 != t && (e = !0);
        else if (2 == n) {
          var r = !1;
          a % 400 == 0
            ? (r = !0)
            : a % 100 == 0
            ? (r = !1)
            : a % 4 == 0 && (r = !0),
            r && t < 30 ? (e = !0) : t < 29 && (e = !0);
        } else e = "DD" != t && "MM" != n && "YY" != a;
      }
      return (
        e ? $("#dateOfBirthIncUnder").hide() : $("#dateOfBirthIncUnder").show(),
        e
      );
    }
    "store" == $("#vacancyType").val()
      ? ($(".storeOnly").show(), $(".bakeryOnly").hide())
      : ($(".storeOnly").hide(), $(".bakeryOnly").show()),
      $("#dobDay, #dobMonth, #dobYear").change(function () {
        $("#dateOfBirthIncUnder").hide();
      }),
      $('input[name="otherCommitments"]').click(function () {
        "yes" == $(this).val()
          ? $("#extraCommitmentsItem").show()
          : $("#extraCommitmentsItem").hide();
      }),
      $("#submitApplication").click(function (e) {
        $("#captchaInputValid").addClass("hiddenForm"),
          $("#captchaInputValid").removeClass("Incomplete"),
          e.preventDefault();
        var t = grecaptcha.getResponse();
        0 == t.length
          ? ($("#captchaInputValid").removeClass("hiddenForm"),
            $("#captchaInputValid").addClass("Incomplete"))
          : ($("#reCaptcha").val(grecaptcha.getResponse()),
            $("#applyForm").submit());
      }),
      $("#jobRoleId").change(function () {
        $("#partTimeQuestions").removeClass("hiddenForm"),
          $("#fakeJobRoleId").val($(this).val()),
          "bakery" == $("#jobRoleId option:selected").data("type")
            ? ($("#vacancyType").val("bakery"),
              $(".storeOnly").hide(),
              $(".bakeryOnly").show())
            : ($("#vacancyType").val("store"),
              $(".storeOnly").show(),
              $(".bakeryOnly").hide());
      }),
      $("#applyForm").submit(function (t) {
        (formName = "applyForm"),
          (animated = !1),
          0 == addressLookedUp
            ? ($("#addressLookup").prev().removeClass("hiddenForm"),
              $("#addressLookup").prev().addClass("Incomplete"))
            : ($("#addressLookup").prev().removeClass("Incomplete"),
              $("#addressLookup").prev().addClass("hiddenForm"));
        var n = !0;
        "1" == $("#requiresCv").val() &&
          ("-1" == $("#uploadId").val()
            ? ($("#uploadValidation").removeClass("hiddenForm"),
              $("#uploadValidation").addClass("Incomplete"),
              (n = !1))
            : ($("#uploadValidation").removeClass("Incomplete"),
              $("#uploadValidation").addClass("hiddenForm"))),
          ("true" != $("#isPartTime").val() &&
            "1" != $("#isRegisteredInterest").val()) ||
            ("undefined" ==
            typeof $('input[name="otherCommitments"]:checked').val()
              ? ($("#otherCommitmentsValidation").removeClass("hiddenForm"),
                $("#otherCommitmentsValidation").addClass("Incomplete"))
              : ($("#otherCommitmentsValidation").removeClass("Incomplete"),
                $("#otherCommitmentsValidation").addClass("hiddenForm")),
            "store" == $("#vacancyType").val() &&
              ("undefined" == typeof $('input[name="canDrive"]:checked').val()
                ? ($("#canDriveValidation").removeClass("hiddenForm"),
                  $("#canDriveValidation").addClass("Incomplete"))
                : ($("#canDriveValidation").removeClass("Incomplete"),
                  $("#canDriveValidation").addClass("hiddenForm")),
              "undefined" ==
              typeof $('input[name="willingToTravel"]:checked').val()
                ? ($("#willingToTravelValidation").removeClass("hiddenForm"),
                  $("#willingToTravelValidation").addClass("Incomplete"))
                : ($("#willingToTravelValidation").removeClass("Incomplete"),
                  $("#willingToTravelValidation").addClass("hiddenForm"))),
            "bakery" == $("#vacancyType").val() &&
              ("undefined" ==
              typeof $('input[name="willingToWorkNightShifts"]:checked').val()
                ? ($("#willingToWorkNightShiftsValidation").removeClass(
                    "hiddenForm"
                  ),
                  $("#willingToWorkNightShiftsValidation").addClass(
                    "Incomplete"
                  ))
                : ($("#willingToWorkNightShiftsValidation").removeClass(
                    "Incomplete"
                  ),
                  $("#willingToWorkNightShiftsValidation").addClass(
                    "hiddenForm"
                  ))));
        var a = !1;
        "undefined" == typeof $('input[name="acceptTerms"]:checked').val()
          ? $("#termsIncUnder").show()
          : ($("#termsIncUnder").hide(), (a = !0));
        var r = !0;
        "1" == $("#isRegisteredInterest").val() &&
          ((r = !1),
          "-1" == $("#jobRoleId").val()
            ? $("#jobRoleUnderInc").show()
            : ($("#jobRoleUnderInc").hide(), (r = !0)));
        var o =
            "false" == $("#isPartTime").val() ||
            validate($("#availabilityForWork")),
          i =
            "false" == $("#isRegisteredInterest").val() ||
            "-1" != $('input[name="jobRoleId"]:selected').val(),
          s =
            "false" == $("#isPartTime").val() ||
            validate($("#availabilityForWork")),
          l =
            ("false" == $("#isRegisteredInterest").val() &&
              "false" == $("#isPartTime").val()) ||
            "no" == $('input[name="otherCommitments"]:checked').val() ||
            validate($("#extraCommitments"));
        return (
          !!(
            validateUnder($("#firstName"), "#firstNameIncUnder") &
            validateUnder($("#surname"), "#surnameIncUnder") &
            validate($("#contactPhone")) &
            validate($("#contactEmail")) &
            o &
            i &
            a &
            n &
            l &
            s &
            r &
            e() &
            validateEmail($("#contactEmail")) &
            validateConfirmEmail(
              $("#confirmContactEmail"),
              $("#contactEmail")
            ) &
            validate($("#address-one")) &
            validateUnder($("#city"), "#cityTownIncUnder") &
            validateUnder($("#postcode"), "#postCodeIncUnder") &
            validateUnderPostcode($("#postcode"))
          ) &&
          ($("#fakePersonalSummary").val($("#personalSummary").val()),
          ("true" != $("#isPartTime").val() &&
            "true" != $("#isRegisteredInterest").val()) ||
            ($("#fakeAvailabilityForWork").val($("#availabilityForWork").val()),
            $("#fakeExtraCommitments").val($("#extraCommitments").val()),
            $("#fakeOtherCommitments").val(
              $('input[name="otherCommitments"]:checked').val()
            ),
            "store" == $("#vacancyType").val()
              ? ($("#fakeCanDrive").val(
                  $('input[name="canDrive"]:checked').val()
                ),
                $("#fakeWillingToTravel").val(
                  $('input[name="willingToTravel"]:checked').val()
                ))
              : $("#fakeWillingToWorkNightShifts").val(
                  $('input[name="willingToWorkNightShifts"]:checked').val()
                )),
          !0)
        );
      });
  }),
  $(document).ready(function () {
    if ("undefined" != typeof STRIPE_PUBLIC_KEY) {
      logServer("Entered checkout page: " + navigator.userAgent);
      var e = Stripe(STRIPE_PUBLIC_KEY),
        t = {
          base: {
            fontFamily: "'brandon-grotesque', sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            "::placeholder": { color: "#ccc" },
          },
        },
        n = e.elements(),
        a = n.create("cardNumber", { style: t }),
        r = n.create("cardExpiry", { style: t }),
        o = n.create("cardCvc", { style: t });
      a.mount("#cardNumber"),
        r.mount("#cardExpiry"),
        o.mount("#cardCvc"),
        a.addEventListener("change", function (e) {
          toggleError("#numberError", e.error, e.error ? e.error.message : "");
        }),
        r.addEventListener("change", function (e) {
          toggleError("#expiryError", e.error, "invalid expiry");
        }),
        o.addEventListener("change", function (e) {
          toggleError("#cvcError", e.error, "invalid");
        });
      var i = document.getElementById("submitPayment");
      i.addEventListener("click", function (t) {
        $("#submitPayment").hide(), $(".spinner").show();
        var n = $("#outstandingChargeId").val(),
          r = $("#outstandingChargeAmount").val();
        e.createPaymentMethod("card", a).then(function (t) {
          if ((console.log(t), t.error))
            showError(t.error.message),
              logServer(t.error.message),
              logServer("Stripe charge error " + JSON.stringify(t));
          else {
            logServer(
              "Stripe create payment method successful - sending to server"
            );
            var a = $("#outstandingChargeId").length
                ? "/portalstripev3"
                : "/processstripev3",
              o = JSON.stringify({
                payment_method_id: t.paymentMethod.id,
                pi_action: "create",
              });
            "/portalstripev3" == a &&
              (o = JSON.stringify({
                payment_method_id: t.paymentMethod.id,
                pi_action: "create",
                outstanding_charge_id: n,
                outstanding_charge_amount: r,
              })),
              $.ajax({
                url: a,
                headers: { "Content-Type": "application/json" },
                type: "POST",
                data: o,
                success: function (t) {
                  logServer(
                    "Stripe charge method response JSON " + JSON.stringify(t)
                  ),
                    1 == t.requires_action
                      ? (logServer("Requires action - handling "),
                        e
                          .handleCardAction(t.payment_intent_client_secret)
                          .then(function (e) {
                            e.error
                              ? (showError(e.error.message),
                                logServer(
                                  "Error on requires action " + e.error.message
                                ))
                              : (logServer(
                                  "Card action handled - PI confirming "
                                ),
                                $.ajax({
                                  url: a,
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  type: "POST",
                                  data: JSON.stringify({
                                    payment_intent_id: e.paymentIntent.id,
                                    pi_action: "confirm",
                                  }),
                                  success: function (e) {
                                    logServer("Confirming result to json "),
                                      logServer(
                                        "Final result " + JSON.stringify(e)
                                      ),
                                      console.log("IN SUCCESS"),
                                      console.log(JSON.stringify(e)),
                                      console.log(e),
                                      e.success
                                        ? (logServer(
                                            "Success - confirming order "
                                          ),
                                          console.log("IN SUCCESS CONFIRM"),
                                          confirmOrder())
                                        : e.error
                                        ? (console.log(e.error),
                                          showError(
                                            "There was a problem processing your payment. " +
                                              e.error
                                          ),
                                          logServer(
                                            "Problem confirming - second phase - " +
                                              e.error
                                          ))
                                        : (showError(
                                            "There was a problem processing your payment. Please check your card details and try again."
                                          ),
                                          logServer(
                                            "Problem confirming - second phase - no error"
                                          ));
                                  },
                                  error: function (e, t, n) {
                                    console.log(n), console.log("IN ERROR");
                                  },
                                }));
                          }))
                      : t.success
                      ? (logServer("Success - confirming order "),
                        confirmOrder())
                      : t.error
                      ? (showError(
                          "There was a problem processing your payment. " +
                            t.error
                        ),
                        logServer(
                          "Problem confirming - generic first phase - " +
                            t.error
                        ),
                        console.log(t),
                        console.log(t.error))
                      : (console.log(t),
                        showError(
                          "There was a problem processing your payment. Please check your card details and try again."
                        ),
                        logServer(
                          "Problem confirming - generic first phase - no error"
                        ));
                },
                error: function (e, t, n) {
                  console.log(n);
                },
              });
          }
        });
      });
    }
  }),
  (window.Modernizr = (function (e, t, n) {
    function a(e) {
      y.cssText = e;
    }
    function r(e, t) {
      return typeof e === t;
    }
    function o(e, t) {
      return !!~("" + e).indexOf(t);
    }
    function i(e, t) {
      for (var a in e) {
        var r = e[a];
        if (!o(r, "-") && y[r] !== n) return "pfx" != t || r;
      }
      return !1;
    }
    function s(e, t, a) {
      for (var o in e) {
        var i = t[e[o]];
        if (i !== n)
          return a === !1 ? e[o] : r(i, "function") ? i.bind(a || t) : i;
      }
      return !1;
    }
    function l(e, t, n) {
      var a = e.charAt(0).toUpperCase() + e.slice(1),
        o = (e + " " + C.join(a + " ") + a).split(" ");
      return r(t, "string") || r(t, "undefined")
        ? i(o, t)
        : ((o = (e + " " + w.join(a + " ") + a).split(" ")), s(o, t, n));
    }
    var d,
      c,
      u,
      p = "2.8.3",
      f = {},
      h = !0,
      m = t.documentElement,
      v = "modernizr",
      g = t.createElement(v),
      y = g.style,
      $ = ({}.toString, " -webkit- -moz- -o- -ms- ".split(" ")),
      b = "Webkit Moz O ms",
      C = b.split(" "),
      w = b.toLowerCase().split(" "),
      x = {},
      T = [],
      k = T.slice,
      S = function (e, n, a, r) {
        var o,
          i,
          s,
          l,
          d = t.createElement("div"),
          c = t.body,
          u = c || t.createElement("body");
        if (parseInt(a, 10))
          for (; a--; )
            (s = t.createElement("div")),
              (s.id = r ? r[a] : v + (a + 1)),
              d.appendChild(s);
        return (
          (o = ["&#173;", '<style id="s', v, '">', e, "</style>"].join("")),
          (d.id = v),
          ((c ? d : u).innerHTML += o),
          u.appendChild(d),
          c ||
            ((u.style.background = ""),
            (u.style.overflow = "hidden"),
            (l = m.style.overflow),
            (m.style.overflow = "hidden"),
            m.appendChild(u)),
          (i = n(d, e)),
          c
            ? d.parentNode.removeChild(d)
            : (u.parentNode.removeChild(u), (m.style.overflow = l)),
          !!i
        );
      },
      I = {}.hasOwnProperty;
    (u =
      r(I, "undefined") || r(I.call, "undefined")
        ? function (e, t) {
            return t in e && r(e.constructor.prototype[t], "undefined");
          }
        : function (e, t) {
            return I.call(e, t);
          }),
      Function.prototype.bind ||
        (Function.prototype.bind = function (e) {
          var t = this;
          if ("function" != typeof t) throw new TypeError();
          var n = k.call(arguments, 1),
            a = function () {
              if (this instanceof a) {
                var r = function () {};
                r.prototype = t.prototype;
                var o = new r(),
                  i = t.apply(o, n.concat(k.call(arguments)));
                return Object(i) === i ? i : o;
              }
              return t.apply(e, n.concat(k.call(arguments)));
            };
          return a;
        }),
      (x.history = function () {
        return !!e.history && !!history.pushState;
      }),
      (x.cssanimations = function () {
        return l("animationName");
      }),
      (x.csstransforms = function () {
        return !!l("transform");
      }),
      (x.csstransforms3d = function () {
        var e = !!l("perspective");
        return (
          e &&
            "webkitPerspective" in m.style &&
            S(
              "@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}",
              function (t, n) {
                e = 9 === t.offsetLeft && 3 === t.offsetHeight;
              }
            ),
          e
        );
      }),
      (x.csstransitions = function () {
        return l("transition");
      });
    for (var D in x)
      u(x, D) &&
        ((c = D.toLowerCase()),
        (f[c] = x[D]()),
        T.push((f[c] ? "" : "no-") + c));
    return (
      (f.addTest = function (e, t) {
        if ("object" == typeof e)
          for (var a in e) u(e, a) && f.addTest(a, e[a]);
        else {
          if (((e = e.toLowerCase()), f[e] !== n)) return f;
          (t = "function" == typeof t ? t() : t),
            "undefined" != typeof h &&
              h &&
              (m.className += " " + (t ? "" : "no-") + e),
            (f[e] = t);
        }
        return f;
      }),
      a(""),
      (g = d = null),
      (function (e, t) {
        function n(e, t) {
          var n = e.createElement("p"),
            a = e.getElementsByTagName("head")[0] || e.documentElement;
          return (
            (n.innerHTML = "x<style>" + t + "</style>"),
            a.insertBefore(n.lastChild, a.firstChild)
          );
        }
        function a() {
          var e = y.elements;
          return "string" == typeof e ? e.split(" ") : e;
        }
        function r(e) {
          var t = g[e[m]];
          return t || ((t = {}), v++, (e[m] = v), (g[v] = t)), t;
        }
        function o(e, n, a) {
          if ((n || (n = t), c)) return n.createElement(e);
          a || (a = r(n));
          var o;
          return (
            (o = a.cache[e]
              ? a.cache[e].cloneNode()
              : h.test(e)
              ? (a.cache[e] = a.createElem(e)).cloneNode()
              : a.createElem(e)),
            !o.canHaveChildren || f.test(e) || o.tagUrn
              ? o
              : a.frag.appendChild(o)
          );
        }
        function i(e, n) {
          if ((e || (e = t), c)) return e.createDocumentFragment();
          n = n || r(e);
          for (
            var o = n.frag.cloneNode(), i = 0, s = a(), l = s.length;
            i < l;
            i++
          )
            o.createElement(s[i]);
          return o;
        }
        function s(e, t) {
          t.cache ||
            ((t.cache = {}),
            (t.createElem = e.createElement),
            (t.createFrag = e.createDocumentFragment),
            (t.frag = t.createFrag())),
            (e.createElement = function (n) {
              return y.shivMethods ? o(n, e, t) : t.createElem(n);
            }),
            (e.createDocumentFragment = Function(
              "h,f",
              "return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&(" +
                a()
                  .join()
                  .replace(/[\w\-]+/g, function (e) {
                    return (
                      t.createElem(e), t.frag.createElement(e), 'c("' + e + '")'
                    );
                  }) +
                ");return n}"
            )(y, t.frag));
        }
        function l(e) {
          e || (e = t);
          var a = r(e);
          return (
            y.shivCSS &&
              !d &&
              !a.hasCSS &&
              (a.hasCSS = !!n(
                e,
                "article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}"
              )),
            c || s(e, a),
            e
          );
        }
        var d,
          c,
          u = "3.7.0",
          p = e.html5 || {},
          f =
            /^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,
          h =
            /^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,
          m = "_html5shiv",
          v = 0,
          g = {};
        !(function () {
          try {
            var e = t.createElement("a");
            (e.innerHTML = "<xyz></xyz>"),
              (d = "hidden" in e),
              (c =
                1 == e.childNodes.length ||
                (function () {
                  t.createElement("a");
                  var e = t.createDocumentFragment();
                  return (
                    "undefined" == typeof e.cloneNode ||
                    "undefined" == typeof e.createDocumentFragment ||
                    "undefined" == typeof e.createElement
                  );
                })());
          } catch (n) {
            (d = !0), (c = !0);
          }
        })();
        var y = {
          elements:
            p.elements ||
            "abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",
          version: u,
          shivCSS: p.shivCSS !== !1,
          supportsUnknownElements: c,
          shivMethods: p.shivMethods !== !1,
          type: "default",
          shivDocument: l,
          createElement: o,
          createDocumentFragment: i,
        };
        (e.html5 = y), l(t);
      })(this, t),
      (f._version = p),
      (f._prefixes = $),
      (f._domPrefixes = w),
      (f._cssomPrefixes = C),
      (f.testProp = function (e) {
        return i([e]);
      }),
      (f.testAllProps = l),
      (f.testStyles = S),
      (m.className =
        m.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") +
        (h ? " js " + T.join(" ") : "")),
      f
    );
  })(this, this.document)),
  (function (e, t, n) {
    function a(e) {
      return "[object Function]" == v.call(e);
    }
    function r(e) {
      return "string" == typeof e;
    }
    function o() {}
    function i(e) {
      return !e || "loaded" == e || "complete" == e || "uninitialized" == e;
    }
    function s() {
      var e = g.shift();
      (y = 1),
        e
          ? e.t
            ? h(function () {
                ("c" == e.t
                  ? p.injectCss
                  : p.injectJs)(e.s, 0, e.a, e.x, e.e, 1);
              }, 0)
            : (e(), s())
          : (y = 0);
    }
    function l(e, n, a, r, o, l, d) {
      function c(t) {
        if (
          !f &&
          i(u.readyState) &&
          (($.r = f = 1),
          !y && s(),
          (u.onload = u.onreadystatechange = null),
          t)
        ) {
          "img" != e &&
            h(function () {
              C.removeChild(u);
            }, 50);
          for (var a in S[n]) S[n].hasOwnProperty(a) && S[n][a].onload();
        }
      }
      var d = d || p.errorTimeout,
        u = t.createElement(e),
        f = 0,
        v = 0,
        $ = { t: a, s: n, e: o, a: l, x: d };
      1 === S[n] && ((v = 1), (S[n] = [])),
        "object" == e ? (u.data = n) : ((u.src = n), (u.type = e)),
        (u.width = u.height = "0"),
        (u.onerror =
          u.onload =
          u.onreadystatechange =
            function () {
              c.call(this, v);
            }),
        g.splice(r, 0, $),
        "img" != e &&
          (v || 2 === S[n]
            ? (C.insertBefore(u, b ? null : m), h(c, d))
            : S[n].push(u));
    }
    function d(e, t, n, a, o) {
      return (
        (y = 0),
        (t = t || "j"),
        r(e)
          ? l("c" == t ? x : w, e, t, this.i++, n, a, o)
          : (g.splice(this.i++, 0, e), 1 == g.length && s()),
        this
      );
    }
    function c() {
      var e = p;
      return (e.loader = { load: d, i: 0 }), e;
    }
    var u,
      p,
      f = t.documentElement,
      h = e.setTimeout,
      m = t.getElementsByTagName("script")[0],
      v = {}.toString,
      g = [],
      y = 0,
      $ = "MozAppearance" in f.style,
      b = $ && !!t.createRange().compareNode,
      C = b ? f : m.parentNode,
      f = e.opera && "[object Opera]" == v.call(e.opera),
      f = !!t.attachEvent && !f,
      w = $ ? "object" : f ? "script" : "img",
      x = f ? "script" : w,
      T =
        Array.isArray ||
        function (e) {
          return "[object Array]" == v.call(e);
        },
      k = [],
      S = {},
      I = {
        timeout: function (e, t) {
          return t.length && (e.timeout = t[0]), e;
        },
      };
    (p = function (e) {
      function t(e) {
        var t,
          n,
          a,
          e = e.split("!"),
          r = k.length,
          o = e.pop(),
          i = e.length,
          o = { url: o, origUrl: o, prefixes: e };
        for (n = 0; n < i; n++)
          (a = e[n].split("=")), (t = I[a.shift()]) && (o = t(o, a));
        for (n = 0; n < r; n++) o = k[n](o);
        return o;
      }
      function i(e, r, o, i, s) {
        var l = t(e),
          d = l.autoCallback;
        l.url.split(".").pop().split("?").shift(),
          l.bypass ||
            (r &&
              (r = a(r)
                ? r
                : r[e] || r[i] || r[e.split("/").pop().split("?")[0]]),
            l.instead
              ? l.instead(e, r, o, i, s)
              : (S[l.url] ? (l.noexec = !0) : (S[l.url] = 1),
                o.load(
                  l.url,
                  l.forceCSS ||
                    (!l.forceJS &&
                      "css" == l.url.split(".").pop().split("?").shift())
                    ? "c"
                    : n,
                  l.noexec,
                  l.attrs,
                  l.timeout
                ),
                (a(r) || a(d)) &&
                  o.load(function () {
                    c(),
                      r && r(l.origUrl, s, i),
                      d && d(l.origUrl, s, i),
                      (S[l.url] = 2);
                  })));
      }
      function s(e, t) {
        function n(e, n) {
          if (e) {
            if (r(e))
              n ||
                (u = function () {
                  var e = [].slice.call(arguments);
                  p.apply(this, e), f();
                }),
                i(e, u, t, 0, d);
            else if (Object(e) === e)
              for (l in ((s = (function () {
                var t,
                  n = 0;
                for (t in e) e.hasOwnProperty(t) && n++;
                return n;
              })()),
              e))
                e.hasOwnProperty(l) &&
                  (!n &&
                    !--s &&
                    (a(u)
                      ? (u = function () {
                          var e = [].slice.call(arguments);
                          p.apply(this, e), f();
                        })
                      : (u[l] = (function (e) {
                          return function () {
                            var t = [].slice.call(arguments);
                            e && e.apply(this, t), f();
                          };
                        })(p[l]))),
                  i(e[l], u, t, l, d));
          } else !n && f();
        }
        var s,
          l,
          d = !!e.test,
          c = e.load || e.both,
          u = e.callback || o,
          p = u,
          f = e.complete || o;
        n(d ? e.yep : e.nope, !!c), c && n(c);
      }
      var l,
        d,
        u = this.yepnope.loader;
      if (r(e)) i(e, 0, u, 0);
      else if (T(e))
        for (l = 0; l < e.length; l++)
          (d = e[l]),
            r(d) ? i(d, 0, u, 0) : T(d) ? p(d) : Object(d) === d && s(d, u);
      else Object(e) === e && s(e, u);
    }),
      (p.addPrefix = function (e, t) {
        I[e] = t;
      }),
      (p.addFilter = function (e) {
        k.push(e);
      }),
      (p.errorTimeout = 1e4),
      null == t.readyState &&
        t.addEventListener &&
        ((t.readyState = "loading"),
        t.addEventListener(
          "DOMContentLoaded",
          (u = function () {
            t.removeEventListener("DOMContentLoaded", u, 0),
              (t.readyState = "complete");
          }),
          0
        )),
      (e.yepnope = c()),
      (e.yepnope.executeStack = s),
      (e.yepnope.injectJs = function (e, n, a, r, l, d) {
        var c,
          u,
          f = t.createElement("script"),
          r = r || p.errorTimeout;
        f.src = e;
        for (u in a) f.setAttribute(u, a[u]);
        (n = d ? s : n || o),
          (f.onreadystatechange = f.onload =
            function () {
              !c &&
                i(f.readyState) &&
                ((c = 1), n(), (f.onload = f.onreadystatechange = null));
            }),
          h(function () {
            c || ((c = 1), n(1));
          }, r),
          l ? f.onload() : m.parentNode.insertBefore(f, m);
      }),
      (e.yepnope.injectCss = function (e, n, a, r, i, l) {
        var d,
          r = t.createElement("link"),
          n = l ? s : n || o;
        (r.href = e), (r.rel = "stylesheet"), (r.type = "text/css");
        for (d in a) r.setAttribute(d, a[d]);
        i || (m.parentNode.insertBefore(r, m), h(n, 0));
      });
  })(this, document),
  (Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0));
  });
