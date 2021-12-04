jQuery(document).ready(function($) {
    "use strict";

    function tanajil_google_maps() {
        if ($(".tanajil-google-maps").length <= 0) {
            return;
        }
        $(".tanajil-google-maps").each(function() {
            var $this = $(this),
                $id = $this.attr("id"),
                $title_maps = $this.attr("data-title_maps"),
                $phone = $this.attr("data-phone"),
                $email = $this.attr("data-email"),
                $zoom = parseInt($this.attr("data-zoom"), 10),
                $latitude = $this.attr("data-latitude"),
                $longitude = $this.attr("data-longitude"),
                $address = $this.attr("data-address"),
                $map_type = $this.attr("data-map-type"),
                $pin_icon = $this.attr("data-pin-icon"),
                $modify_coloring = true,
                $saturation = $this.attr("data-saturation"),
                $hue = $this.attr("data-hue"),
                $map_style = $this.data("map-style"),
                $styles;

            if ($modify_coloring == true) {
                var $styles = [{
                        stylers: [
                            { hue: $hue },
                            { invert_lightness: false },
                            { saturation: $saturation },
                            { lightness: 1 },
                            {
                                featureType: "landscape.man_made",
                                stylers: [{
                                    visibility: "on",
                                }, ],
                            },
                        ],
                    },
                    {
                        featureType: "all",
                        elementType: "labels.text.fill",
                        stylers: [
                            { saturation: 36 },
                            { color: "#000000" },
                            { lightness: 40 },
                        ],
                    },
                    {
                        featureType: "all",
                        elementType: "labels.text.stroke",
                        stylers: [
                            { visibility: "on" },
                            { color: "#000000" },
                            { lightness: 16 },
                        ],
                    },
                    {
                        featureType: "all",
                        elementType: "labels.icon",
                        stylers: [{ visibility: "off" }],
                    },
                    {
                        featureType: "administrative",
                        elementType: "geometry.fill",
                        stylers: [{ color: "#000000" }, { lightness: 20 }],
                    },
                    {
                        featureType: "administrative",
                        elementType: "geometry.stroke",
                        stylers: [{ color: "#000000" }, { lightness: 17 }, { weight: 1.2 }],
                    },
                    {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [{ color: "#000000" }, { lightness: 20 }],
                    },
                    {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [{ color: "#000000" }, { lightness: 21 }],
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [{ color: "#000000" }, { lightness: 17 }],
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry.stroke",
                        stylers: [{ color: "#000000" }, { lightness: 29 }, { weight: 0.2 }],
                    },
                    {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [{ color: "#000000" }, { lightness: 18 }],
                    },
                    {
                        featureType: "road.local",
                        elementType: "geometry",
                        stylers: [{ color: "#000000" }, { lightness: 16 }],
                    },
                    {
                        featureType: "transit",
                        elementType: "geometry",
                        stylers: [{ color: "#000000" }, { lightness: 19 }],
                    },
                    {
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{ color: "#000000" }, { lightness: 17 }],
                    },
                ];
            }
            var map;
            var bounds = new google.maps.LatLngBounds();
            var mapOptions = {
                zoom: $zoom,
                panControl: true,
                zoomControl: true,
                mapTypeControl: true,
                scaleControl: true,
                draggable: true,
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId[$map_type],
                styles: $styles,
            };

            map = new google.maps.Map(document.getElementById($id), mapOptions);
            map.setTilt(45);

            // Multiple Markers
            var markers = [];
            var infoWindowContent = [];

            if ($latitude != "" && $longitude != "") {
                markers[0] = [$address, $latitude, $longitude];
                infoWindowContent[0] = [$address];
            }

            var infoWindow = new google.maps.InfoWindow(),
                marker,
                i;

            for (i = 0; i < markers.length; i++) {
                var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                bounds.extend(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: markers[i][0],
                    icon: $pin_icon,
                });

                map.fitBounds(bounds);
            }

            var boundsListener = google.maps.event.addListener(
                map,
                "bounds_changed",
                function(event) {
                    this.setZoom($zoom);
                    google.maps.event.removeListener(boundsListener);
                }
            );
        });
    }

    $(document).ready(function() {
        tanajil_google_maps();
    });

    function tanajil_init_menu_toggle() {
        var contain = ".tanajil-nav-toggle";
        $(contain).each(function() {
            var _main = $(this);
            _main.children(".menu-item.parent").each(function() {
                var curent = $(this).find(".submenu");

                $(this)
                    .children(".toggle-submenu")
                    .on("click", function() {
                        $(this).parent().children(".submenu").slideToggle(500);
                        _main.find(".submenu").not(curent).slideUp(500);

                        $(this).parent().toggleClass("show-submenu");
                        _main
                            .find(".menu-item.parent")
                            .not($(this).parent())
                            .removeClass("show-submenu");
                    });

                var next_curent = $(this).find(".submenu");

                next_curent.children(".menu-item.parent").each(function() {
                    var child_curent = $(this).find(".submenu");
                    $(this)
                        .children(".toggle-submenu")
                        .on("click", function() {
                            $(this)
                                .parent()
                                .parent()
                                .find(".submenu")
                                .not(child_curent)
                                .slideUp(500);
                            $(this).parent().children(".submenu").slideToggle(500);

                            $(this)
                                .parent()
                                .parent()
                                .find(".menu-item.parent")
                                .not($(this).parent())
                                .removeClass("show-submenu");
                            $(this).parent().toggleClass("show-submenu");
                        });
                });
            });
        });
    }
    // click menu
    $(document).on("click", ".bar-open-menu", function() {
        $(this).toggleClass("active");
        $(this)
            .closest(".main-header")
            .find(".header-nav")
            .toggleClass("show-menu");
        return false;
    });
    // vertical-menu
    $(document).on("click", ".block-title", function() {
        $(this).closest(".block-nav-categori").toggleClass("active");
        $(this)
            .closest(".block-nav-categori")
            .find(".verticalmenu-content")
            .toggleClass("show-up");
        return false;
    });
    $(document).on("click", ".bar-open-menu,.vertical-menu-overlay", function() {
        $("body").toggleClass("vertical-menu-open");
        return false;
    });
    $(document).on("click", ".error-404 .toggle-hightlight", function() {
        $(this).closest(".text-404").find(".search-form").toggleClass("open");
        return false;
    });
    // ----------tanajil_custom_scrollbar-------------------
    function tanajil_custom_scrollbar() {
        $(".tanajil-mini-cart .minicart-items").mCustomScrollbar();
        $(".tanajil-mini-cart .minicart-items").change(function() {
            $(".tanajil-mini-cart .minicart-items").mCustomScrollbar();
        });
    }

    function tanajil_custom_scrollbar_header_nav() {
        $(
            ".header.vertical-style .header-nav .container-wapper"
        ).mCustomScrollbar();
        $(".header.vertical-style .header-nav .container-wapper").change(
            function() {
                $(
                    ".header.vertical-style .header-nav .container-wapper"
                ).mCustomScrollbar();
            }
        );
    }

    //------------------ Video Lightbox------------
    function tanajil_video() {
        $(".quick-install").simpleLightboxVideo();
    }

    // --------------------remove_class_equal--------------------------
    function tanajil_remove_class_review() {
        var _winw = $(window).innerWidth();
        if (_winw < 992) {
            $(".sevice-item.style-1")
                .removeClass("equal-container")
                .find(".equal-element")
                .removeAttr("style");
        } else {
            $(".sevice-item.style-1").addClass("equal-container");
        }
    }

    // -----------tanajil_details_thumd--------------------
    function tanajil_details_thumd_zoom() {
        /* ------------------------------------------------
             Arctic modal
             ------------------------------------------------ */
        if ($.arcticmodal) {
            $.arcticmodal("setDefault", {
                type: "ajax",
                ajax: {
                    cache: false,
                },
                afterOpen: function(obj) {
                    var mw = $(".modal_window");

                    mw.find(".custom_select").customSelect();

                    mw.find(".product_preview .owl_carousel").owlCarousel({
                        margin: 10,
                        themeClass: "thumbnails_carousel",
                        nav: true,
                        navText: [],
                        rtl: window.ISRTL ? true : false,
                    });

                    Core.events.productPreview();

                    addthis.toolbox(".addthis_toolbox");
                },
            });
        }
        // ---------Popup sizechart---------------
        if ($("#size_chart").length > 0) {
            $("#size_chart").fancybox();
        }

        if ($.fancybox) {
            $.fancybox.defaults.direction = {
                next: "left",
                prev: "right",
            };
        }
        /* ------------------------------------------------
             Fancybox
             ------------------------------------------------ */
        if ($(".fancybox_item").length) {
            $(".fancybox_item").fancybox({
                openEffect: "elastic",
                closeEffect: "elastic",
                helpers: {
                    overlay: {
                        css: {
                            background: "rgba(0,0,0, .6)",
                        },
                    },
                    thumbs: {
                        width: 50,
                        height: 50,
                    },
                },
            });
        }
        if ($(".fancybox_item_media").length) {
            $(".fancybox_item_media").fancybox({
                openEffect: "none",
                closeEffect: "none",
                helpers: {
                    media: {},
                },
            });
        }
        /* ------------------------------------------------
             Elevate Zoom
             ------------------------------------------------ */
        if ($("#img_zoom").length) {
            $("#img_zoom").elevateZoom({
                zoomType: "inner",
                gallery: "thumbnails",
                galleryActiveClass: "active",
                cursor: "crosshair",
                responsive: true,
                easing: true,
                zoomWindowFadeIn: 500,
                zoomWindowFadeOut: 500,
                lensFadeIn: 500,
                lensFadeOut: 500,
            });
            $(".open_qv").on("click", function(e) {
                var ez = $(this).siblings("img").data("elevateZoom");
                $.fancybox(ez.getGalleryList());
                e.preventDefault();
            });
        }
    }

    // -------chosen----------------------------------------------------

    $(".chosen-select").chosen({ disable_search_threshold: 10 });
    // ====================isotop========================
    function tanajil_masonry() {
        var masonry = $(".masonry-grid").isotope({
            // set itemSelector so .grid-sizer is not used in layout
            itemSelector: ".grid-item",
            percentPosition: true,
            layoutMode: "masonry",
            masonry: {
                // set to the element
                columnWidth: ".grid-sizer",
            },
        });
    }

    /* TOGGLE */
    function tanajil_dropdown() {
        $(document).on("click", ".header-control .close", function() {
            $(this).closest(".tanajil-dropdown").removeClass("open");
        });
        $(document).on("click", function(event) {
            var _target = $(event.target).closest(".tanajil-dropdown");
            var _allparent = $(".tanajil-dropdown");

            if (_target.length > 0) {
                _allparent.not(_target).removeClass("open");
                if (
                    $(event.target).is('[data-tanajil="tanajil-dropdown"]') ||
                    $(event.target).closest('[data-tanajil="tanajil-dropdown"]').length >
                    0
                ) {
                    _target.toggleClass("open");
                    return false;
                }
            } else {
                $(".tanajil-dropdown").removeClass("open");
            }
        });
    }

    function tanajil_mobile_block() {
        $(document).on(
            "click",
            ".header-device-mobile .item.has-sub>a",
            function() {
                $(this)
                    .closest(".header-device-mobile")
                    .find(".item")
                    .removeClass("open");

                $(this).closest(".item").addClass("open");
                return false;
            }
        );
        $(document).on("click", ".header-device-mobile .item .close", function() {
            $(this).closest(".item").removeClass("open");
            return false;
        });
        $(document).on("click", "*", function(event) {
            if (!$(event.target).closest(".header-device-mobile").length) {
                $(".header-device-mobile").find(".item").removeClass("open");
            }
        });
    }

    // =====================slick============================
    function tanajil_init_carousel() {
        $(".owl-slick")
            .not(".slick-initialized")
            .each(function() {
                var _this = $(this),
                    _responsive = _this.data("responsive"),
                    _config = [];

                if ($("body").hasClass("rtl")) {
                    _config.rtl = true;
                }
                if (_this.hasClass("slick-vertical")) {
                    _config.prevArrow = '<span class="pe-7s-angle-up"></span>';
                    _config.nextArrow = '<span class="pe-7s-angle-down"></span>';
                } else {
                    _config.prevArrow = '<span class="fa fa-angle-left"></span>';
                    _config.nextArrow = '<span class="fa fa-angle-right"></span>';
                }
                _config.responsive = _responsive;
                _config.cssEase = "linear";

                _this.slick(_config);
                _this.on("afterChange", function(event, slick, direction) {
                    _this.find(".slick-active:first").addClass("first-slick");
                    _this.find(".slick-active:last").addClass("last-slick");
                });
                _this.on("beforeChange", function(event, slick, currentSlide) {
                    _this.find(".slick-slide").removeClass("last-slick");
                    _this.find(".slick-slide").removeClass("first-slick");
                });
                if (_this.hasClass("slick-vertical")) {
                    equal_elems();
                    setTimeout(function() {
                        _this.slick("setPosition");
                    }, 0);
                }
                _this.find(".slick-active:first").addClass("first-slick");
                _this.find(".slick-active:last").addClass("last-slick");
            });
    }

    /* ---------------------------------------------
       TAB EFFECT
       --------------------------------------------- */
    function tanajil_tab_fade_effect() {
        // effect click
        $(document).on("click", ".tanajil-tabs .tab-link a", function() {
            var tab_id = $(this).attr("href");
            var tab_animated = $(this).data("animate");

            tab_animated =
                tab_animated == undefined || tab_animated == "" ? "" : tab_animated;
            if (tab_animated == "") {
                return false;
            }

            $(tab_id)
                .find(
                    ".product-list-owl .owl-item.active, .product-list-grid .product-item"
                )
                .each(function(i) {
                    var t = $(this);
                    var style = $(this).attr("style");
                    style = style == undefined ? "" : style;
                    var delay = i * 400;
                    t.attr(
                            "style",
                            style +
                            ";-webkit-animation-delay:" +
                            delay +
                            "ms;" +
                            "-moz-animation-delay:" +
                            delay +
                            "ms;" +
                            "-o-animation-delay:" +
                            delay +
                            "ms;" +
                            "animation-delay:" +
                            delay +
                            "ms;"
                        )
                        .addClass(tab_animated + " animated")
                        .one(
                            "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
                            function() {
                                t.removeClass(tab_animated + " animated");
                                t.attr("style", style);
                            }
                        );
                });
        });
    }

    // -------------------------newletter-----------------------------
    function newletter_popup() {
        var window_size = parseFloat(jQuery("body").innerWidth());
        window_size += kt_get_scrollbar_width();
        if (window_size > 991) {
            if ($("body").hasClass("home-newletter")) {
                var _content = $(".kt-popup-newsletter");
                $.magnificPopup.open({
                    items: {
                        src: _content,
                        type: "inline",
                    },
                });
            }
        }
    }

    // ------------------------Quick view----------------------------------------
    function quickview_popup() {
        var window_size = parseFloat(jQuery("body").innerWidth());
        window_size += kt_get_scrollbar_width();
        if (window_size > 992) {
            $(document).on("click", ".quick-wiew-button", function() {
                $.magnificPopup.open({
                    items: {
                        src: '<div class="kt-popup-quickview "><div class="details-thumb"><div class="slider-product slider-for"><div class="details-item"><img src="assets/images/popup-quickview-item-1.jpg" alt="img"></div><div class="details-item"><img src="assets/images/popup-quickview-item-1.jpg" alt="img"></div><div class="details-item"><img src="assets/images/popup-quickview-item-1.jpg" alt="img"></div><div class="details-item"><img src="assets/images/popup-quickview-item-1.jpg" alt="img"></div></div><div class="slider-product-button slider-nav nav-center"><div class="details-item"><img src="assets/images/popup-quickview-item-1.jpg" alt="img"></div><div class="details-item"><img src="assets/images/popup-quickview-item-1.jpg" alt="img"></div><div class="details-item"><img src="assets/images/popup-quickview-item-1.jpg" alt="img"></div><div class="details-item"><img src="assets/images/popup-quickview-item-1.jpg" alt="img"></div></div></div><div class="details-infor"><h1 class="product-title">Eclipse Pendant Light</h1><div class="stars-rating"><div class="star-rating"><span class="star-5"></span></div><div class="count-star">(7)</div></div><div class="availability">availability:<a href="#">in Stock</a></div><div class="price"><span>€45</span></div><div class="product-details-description"><ul><li>Vestibulum tortor quam</li><li>Imported</li><li>Art.No. 06-7680</li></ul></div><div class="variations"><div class="attribute attribute_color"><div class="color-text text-attribute">Color:<span>White/</span><span>Black/</span><span>Teal/</span><span>Brown</span></div><div class="list-color list-item"><a href="#" class="color1"></a><a href="#" class="color2"></a><a href="#" class="color3 active"></a><a href="#" class="color4"></a></div></div><div class="attribute attribute_size"><div class="size-text text-attribute">Size:</div><div class="list-size list-item"><a href="#" class="">xs</a><a href="#" class="">s</a><a href="#" class="active">m</a><a href="#" class="">l</a><a href="#" class="">xl</a><a href="#" class="">xxl</a></div></div></div><div class="group-button"><div class="yith-wcwl-add-to-wishlist"><div class="yith-wcwl-add-button"><a href="#">Add to Wishlist</a></div></div><div class="size-chart-wrapp"><div class="btn-size-chart"><a id="size_chart" href="assets/images/size-chart.jpg" class="fancybox"  target="_blank">View Size Chart</a></div></div><div class="quantity-add-to-cart"><div class="quantity"><div class="control"><a class="btn-number qtyminus quantity-minus" href="#">-</a><input type="text" data-step="1" data-min="0" value="1" title="Qty" class="input-qty qty" size="4"><a href="#" class="btn-number qtyplus quantity-plus">+</a></div></div><button class="single_add_to_cart_button button">Add to cart</button></div></div></div></div>',
                        type: "inline",
                    },
                });
                slick_quickview_popup();
                return false;
            });
        }
    }

    function slick_quickview_popup() {
        $(".slider-for").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: ".slider-nav",
        });
        $(".slider-nav").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            asNavFor: ".slider-for",
            dots: false,
            focusOnSelect: true,
            infinite: true,
            prevArrow: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            nextArrow: '<i class="fa fa-angle-right " aria-hidden="true"></i>',
        });
    }

    // --------------------------------BACK TO TOP-----------------------------
    $(window).on("scroll", function() {
        if ($(window).scrollTop() > 1000) {
            $(".backtotop").addClass("show");
        } else {
            $(".backtotop").removeClass("show");
        }
    });
    $(document).on("click", "a.backtotop", function() {
        $("html, body").animate({ scrollTop: 0 }, 800);
    });
    //---------------------------Price filter----------------------
    $(".slider-range-price").each(function() {
        var min = $(this).data("min");
        var max = $(this).data("max");
        var unit = $(this).data("unit");
        var value_min = $(this).data("value-min");
        var value_max = $(this).data("value-max");
        var label_result = $(this).data("label-result");
        var t = $(this);
        $(this).slider({
            range: true,
            min: min,
            max: max,
            values: [value_min, value_max],
            slide: function(event, ui) {
                var result =
                    " <span>" +
                    unit +
                    ui.values[0] +
                    " </span>  <span> " +
                    unit +
                    ui.values[1] +
                    "</span>";
                // var result = label_result + " <span>" + unit + ui.values[0] + ' </span>  <span> ' + unit + ui.values[1] + '</span>';
                t.closest(".price-slider-wrapper")
                    .find(".price-slider-amount")
                    .html(result);
            },
        });
    });
    //----------------Woocommerce plus and minius-------------------------
    $(document).on(
        "click",
        ".quantity .quantity-plus, .quantity .quantity-minus",
        function(e) {
            // Get values
            var $qty = $(this).closest(".quantity").find(".qty"),
                currentVal = parseFloat($qty.val()),
                max = parseFloat($qty.attr("max")),
                min = parseFloat($qty.attr("min")),
                step = $qty.attr("step");
            // Format values
            if (!currentVal || currentVal === "" || currentVal === "NaN")
                currentVal = 0;
            if (max === "" || max === "NaN") max = "";
            if (min === "" || min === "NaN") min = 0;
            if (
                step === "any" ||
                step === "" ||
                step === undefined ||
                parseFloat(step) === "NaN"
            )
                step = 1;
            // Change the value
            if ($(this).is(".quantity-plus")) {
                if (max && (max == currentVal || currentVal > max)) {
                    $qty.val(max);
                } else {
                    $qty.val(currentVal + parseFloat(step));
                }
            } else {
                if (min && (min == currentVal || currentVal < min)) {
                    $qty.val(min);
                } else if (currentVal > 0) {
                    $qty.val(currentVal - parseFloat(step));
                }
            }
            // Trigger change event
            $qty.trigger("change");
            e.preventDefault();
        }
    );
    //------------------------EQUAL ELEM----------------------------
    function better_equal_elems() {
        setTimeout(function() {
            $(".equal-container").each(function() {
                var $this = $(this);
                if ($this.find(".equal-element").length) {
                    $this.find(".equal-element").css({
                        height: "auto",
                    });
                    var elem_height = 0;
                    $this.find(".equal-element").each(function() {
                        var this_elem_h = $(this).height();
                        if (elem_height < this_elem_h) {
                            elem_height = this_elem_h;
                        }
                    });
                    $this.find(".equal-element").height(elem_height);
                }
            });
        }, 1000);
    }

    $(window).load(function() {
        better_equal_elems();
    });
    $(window).on("resize", function() {
        better_equal_elems();
    });
    // ------------------owl-thumbs-----------------------------------------------
    init_carousel();

    function init_carousel() {
        //owl has thumbs
        $(".owl-carousel.has-thumbs").owlCarousel({
            loop: true,
            items: 1,
            thumbs: true,
            thumbImage: true,
            thumbContainerClass: "owl-thumbs",
            thumbItemClass: "owl-thumb-item",
        });
        // owl config
        $(".owl-carousel").each(function(index, el) {
            var config = $(this).data();
            config.navText = [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>',
            ];
            var animateOut = $(this).data("animateout");
            var animateIn = $(this).data("animatein");
            var slidespeed = parseFloat($(this).data("slidespeed"));

            if (typeof animateOut != "undefined") {
                config.animateOut = animateOut;
            }
            if (typeof animateIn != "undefined") {
                config.animateIn = animateIn;
            }
            if (typeof slidespeed != "undefined") {
                config.smartSpeed = slidespeed;
            }

            if ($("body").hasClass("rtl")) {
                config.rtl = true;
            }

            var owl = $(this);
            owl.on("initialized.owl.carousel", function(event) {
                var total_active = parseInt(owl.find(".owl-item.active").length);
                var i = 0;
                owl.find(".owl-item").removeClass("item-first item-last");
                setTimeout(function() {
                    owl.find(".owl-item.active").each(function() {
                        i++;
                        if (i == 1) {
                            $(this).addClass("item-first");
                        }
                        if (i == total_active) {
                            $(this).addClass("item-last");
                        }
                    });
                }, 100);
            });
            owl.on("refreshed.owl.carousel", function(event) {
                var total_active = parseInt(owl.find(".owl-item.active").length);
                var i = 0;
                owl.find(".owl-item").removeClass("item-first item-last");
                setTimeout(function() {
                    owl.find(".owl-item.active").each(function() {
                        i++;
                        if (i == 1) {
                            $(this).addClass("item-first");
                        }
                        if (i == total_active) {
                            $(this).addClass("item-last");
                        }
                    });
                }, 100);
            });
            owl.on("change.owl.carousel", function(event) {
                var total_active = parseInt(owl.find(".owl-item.active").length);
                var i = 0;
                owl.find(".owl-item").removeClass("item-first item-last");
                setTimeout(function() {
                    owl.find(".owl-item.active").each(function() {
                        i++;
                        if (i == 1) {
                            $(this).addClass("item-first");
                        }
                        if (i == total_active) {
                            $(this).addClass("item-last");
                        }
                    });
                }, 100);
                owl.addClass("owl-changed");
                setTimeout(function() {
                    owl.removeClass("owl-changed");
                }, config.smartSpeed);
            });
            owl.on("drag.owl.carousel", function(event) {
                owl.addClass("owl-changed");
                setTimeout(function() {
                    owl.removeClass("owl-changed");
                }, config.smartSpeed);
            });
            owl.owlCarousel(config);
            // Sections backgrounds
            if ($(window).width() < 992) {
                var itembackground = $(".item-background");
                itembackground.each(function(index) {
                    if ($(".item-background").attr("data-background")) {
                        $(this).css(
                            "background-image",
                            "url(" + $(this).data("background") + ")"
                        );
                        $(this).css(
                            "height",
                            $(this).closest(".owl-carousel").data("height") + "px"
                        );
                        $(".slide-img").css("display", "none");
                    }
                });
            }
        });
    }

    // --------------------------------------------------------------------------
    function kt_get_scrollbar_width() {
        var $inner = jQuery('<div style="width: 100%; height:200px;">test</div>'),
            $outer = jQuery(
                '<div style="width:200px;height:150px; position: absolute; top: 0; left: 0; visibility: hidden; overflow:hidden;"></div>'
            ).append($inner),
            inner = $inner[0],
            outer = $outer[0];
        jQuery("body").append(outer);
        var width1 = parseFloat(inner.offsetWidth);
        $outer.css("overflow", "scroll");
        var width2 = parseFloat(outer.clientWidth);
        $outer.remove();
        return width1 - width2;
    }

    // -----------------------------mega-menu------------------
    kt_resizeMegamenu();

    function kt_resizeMegamenu() {
        var window_size = parseFloat(jQuery("body").innerWidth());
        window_size += kt_get_scrollbar_width();
        if (window_size > 990) {
            if ($(".container-wapper .main-menu").length > 0) {
                var container = $(".main-menu-wapper");
                if (container != "undefined") {
                    var container_width = 0;
                    container_width = parseFloat(container.innerWidth());
                    var container_offset = 0;
                    container_offset = container.offset();
                    setTimeout(function() {
                        $(".main-menu .menu-item-has-children").each(function(
                            index,
                            element
                        ) {
                            $(element)
                                .children(".mega-menu")
                                .css({ width: container_width + "px" });
                            var sub_menu_width = parseFloat(
                                $(element).children(".mega-menu").outerWidth()
                            );
                            var item_width = parseFloat($(element).outerWidth());
                            $(element)
                                .children(".mega-menu")
                                .css({
                                    left: "-" + (sub_menu_width / 2 - item_width / 2) + "px",
                                });
                            var container_left = container_offset.left;
                            var container_right = container_left + container_width;
                            var item_left = $(element).offset().left;
                            var overflow_left =
                                sub_menu_width / 2 > item_left - container_left;
                            var overflow_right =
                                sub_menu_width / 2 + item_left > container_right;
                            if (overflow_left) {
                                var left = item_left - container_left;
                                $(element)
                                    .children(".mega-menu")
                                    .css({ left: -left + "px" });
                            }
                            if (overflow_right && !overflow_left) {
                                var left = item_left - container_left;
                                left = left - (container_width - sub_menu_width);
                                $(element)
                                    .children(".mega-menu")
                                    .css({ left: -left + "px" });
                            }
                        });
                    }, 100);
                }
            }
        }
    }

    // -----------------count down years months -------------------------------
    function tanajil_countdown() {
        if ($(".tanajil-countdown").length > 0) {
            var labels = ["Years", "Months", "Weeks", "Days", "Hrs", "Mins", "Secs"];
            var layout =
                '<span class="box-count day"><span class="number">{dnn}</span> <span class="text">Days</span></span><span class="box-count hrs"><span class="number">{hnn}</span> <span class="text">Hrs</span></span><span class="box-count min"><span class="number">{mnn}</span> <span class="text">Mins</span></span><span class="box-count secs"><span class="number">{snn}</span> <span class="text">Secs</span></span>';
            $(".tanajil-countdown").each(function() {
                var austDay = new Date(
                    $(this).data("y"),
                    $(this).data("m") - 1,
                    $(this).data("d"),
                    $(this).data("h"),
                    $(this).data("i"),
                    $(this).data("s")
                );
                $(this).countdown({
                    until: austDay,
                    labels: labels,
                    layout: layout,
                });
            });
        }
    }

    // ******************************************************************************************************************************************************************
    // **                                                                                                                                                              **
    // **                                                            BEAM SABER PROJECT JAVASCRIPT                                                                      **
    // **                                                                                                                                                              **
    // ******************************************************************************************************************************************************************

    //---------------------------------Pageination ---------------------------------------

    function pagesRender() {
        const pageArray = $("div.nav-link > a");
        const currrentPage = $("#currpageVar");
        const pageNumberInt = parseInt(currrentPage.text());
        const orderNumber = [-2, -1, 0, 1, 2];

        // This is a loop that go through all element of pageItem class
        if (pageNumberInt > 3) {
            pageArray.each(function(i = 1, pages = $(this)) {
                const page = $(this).text();
                console.log("loop number: " + i);
                console.log("item: " + page);

                let changeto = pageNumberInt;
                changeto = changeto + orderNumber[i];
                console.log("change to: " + changeto);

                // changing text and link
                $(this).text(changeto);
                $(this).attr("href", () => {
                    const url = "?page=" + changeto;
                    console.log("page change: " + url);
                    return url;
                });
            });
        }

        pageArray.each(function(i = 1, pages = $(this)) {
            const page = $(this).text();
            console.log("loop number: " + i);
            console.log("item: " + page);
            if (parseInt(page) == parseInt(currrentPage.text())) {
                console.log("found matching page: " + page + "|" + currrentPage.text());
                $(this).toggleClass("current");
                return false;
            }
            i++;
        });
    }

    function pageination_toggle_current_page() {
        const pageItem = $("div.nav-link > a");
        const pageCurr = $("#currpage");

        // This is a loop that go through all element of pageItem class
        pageItem.each(function(i = 1, pages = $(this)) {
            let pages_number = $(this).text();
            console.log("loop number: " + i);
            console.log("item: " + pages_number);

            // Find the current page to toggle
            if (parseInt(pages_number) == parseInt(pageCurr.text())) {
                console.log(
                    "found matching page: " + pages_number + " " + pageCurr.text()
                );
                $(this).toggleClass("current");
                return;
            }
            i++;
        });
    }

    function nextpage_click() {
        const pageItem = $("div.nav-link > a");
        const pageCurr = $("#currpageVar");
        const next_page_button = $("#next_page");

        // when click on next page button we will loop through all page => find current page => click on next page
        next_page_button.click(() => {
            const pageNumberInt = parseInt(pageCurr.text(), 10);

            console.log("current page: " + pageNumberInt);

            pageItem.each(function(i = 1, pages = $(this)) {
                console.log("loop number : " + i);

                // if page is full we have to make new pages array
                if (i == 4) {
                    console.log("page full");
                    pageItem.each(function(j = 1, pages = $(this)) {
                        let changeto = pageNumberInt;
                        changeto = changeto + j;
                        console.log("change to: " + changeto);

                        // changing text and link
                        $(this).text(changeto);
                        $(this).attr("href", () => {
                            const url = "?page=" + changeto;
                            console.log("page change: " + url);
                            return url;
                        });
                    });
                    return false;
                }
                let pages_number = $(this).text();
                // Find the current page to click next page
                if (parseInt(pages_number) == parseInt(pageCurr.text())) {
                    const next_page = $(this).next();
                    console.log("next page is: " + next_page.text());
                    if (next_page.text() == "") {
                        console.log("page full");
                    } else {
                        next_page[0].click();
                        return false;
                    }
                }
                i++;
            });
        });
    }

    function prevpage_click() {
        const pageItem = $("div.nav-link > a");
        const pageCurr = $("#currpageVar");
        const prev_page_button = $("#prev_page");

        // when click on next page button we will loop through all page => find current page => click on prev page
        prev_page_button.click(() => {
            pageItem.each(function(i = 1, pages = $(this)) {
                let pages_number = $(this).text();
                // Find the current page to click next page
                if (parseInt(pages_number) == parseInt(pageCurr.text())) {
                    const prev_page = $(this).prev();
                    prev_page[0].click();
                }
                i++;
            });
        });
    }

    //--------------------------------- Delete Product Action -------------------------------------
    function delete_product() {
        // event listener for remove row putton
        $("#table_product").on("click", ".btnRemoveProduct", function() {
            var currentRow = $(this).closest("tr");
            // get current row 1st TD value
            var col1 = currentRow.find("td:eq(0)").text();
            alert("you delete product with id =" + col1);
            $.post("/product/resource_remove_data", { product_id: col1 }, function(result) {
                alert("delete product with id =" + col1 + " " + result);
                if (result == "success") {
                    location.reload(true);
                }
            });
        });
    }

    /// --------------------------- Add Product Action ---------------------------------------------
    function addProduct() {
        // event listener
        $("#add_product_table").on("click", ".btn-rounded.edit", function() {
            // find the row where button is clicked
            const currentRow = $(this).closest("tr");
            const product_id = currentRow.find("td:eq(0)").text();
            const name = currentRow.find("td:eq(1)").text();
            const grade = currentRow.find("td:eq(2)").text();
            const description = currentRow.find("td:eq(3)").text();
            const universe = currentRow.find("td:eq(4)").text();
            const price = currentRow.find("td:eq(5)").text();
            alert(
                "you have fill those info: " +
                product_id +
                " " +
                name +
                " " +
                price +
                " " +
                universe +
                " " +
                grade +
                " " +
                description
            );

            const imagesFormData = new FormData();
            imagesFormData.append("file", $("#pictureFilesInput")[0].files[0], name);

            // posting string data
            // $.post(
            //   "/product/add",
            //   { product_id, name, grade, description, universe, price },
            //   function (result) {
            //     alert("create product: " + result);
            //   }
            // );

            //posting file dataType

            $.ajax({
                url: "/product/create_form",
                type: "POST",
                data: imagesFormData,
                // Tell jQuery not to process data or worry about content-type
                cache: false,
                contentType: false,
                processData: false,
            }).done(function(response) {
                alert(response);
            });


        });
    }
    //---------------------------------- EDIT USER BUTTON -----------------------------------------------------------
    function editAccountButton(){
        $("#table_account").on(
            "click",
            ".btn-warning.btn-rounded.account-edit",
            function() {
                var currentRow = $(this).closest("tr");
                // get all value in row
                const user_id = currentRow.find("td:eq(0)").text();
                const name = currentRow.find("td:eq(1)").text();
                const email = currentRow.find("td:eq(2)").text();
                const password = currentRow.find("td:eq(3)").text();
                const phone = currentRow.find("td:eq(4)").text();
                const address = currentRow.find("td:eq(5)").text();
                const bank_account = currentRow.find("td:eq(6)").text();
                const role = currentRow.find("td:eq(7)").text();

                alert(
                   "you edit: " + role + " " + bank_account + address + " " + phone + " " + password + " " + email + " " + name + " " + user_id
                );

                $.post(
                    "/account/resource", { user_id, name,email, password,phone,address,bank_account,role},
                    function(result) {
                        alert("edit product: " + result);
                        if (result == "success") {
                            location.reload(true);
                        }
                    }
                );
            }
        );
    }

    //---------------------------------------------Delete account-----------------------------------------------------
    function delete_account() {
        // event listener for remove row putton
        $("#table_account").on("click", ".btn-danger.btn-rounded.account-delete", function() {
            var currentRow = $(this).closest("tr");
            // get current row 1st TD value
            var col1 = currentRow.find("td:eq(0)").text();
            alert("you delete account with id =" + col1);
            $.ajax({
                url: "/account/resource/"+col1,
                type: "DELETE",
                success: function(result) {
                    alert(result);
                    location.reload(true);
                }
            })
            // $.post("/product/resource_remove_data", { product_id: col1 }, function(result) {
            //     alert("delete product with id =" + col1 + " " + result);
            //     if (result == "success") {
            //         location.reload(true);
            //     }
            // });
        });
    }



    //--------------------------------- Edit Product Action ---------------------------------------------------------
    
    // $('#table_product').on('click',".btn-warning.btn-rounded.product-edit",function(){
    //     alert("you click")

    // })
    
    function editProductButton() {
        // event listener for remove row button
        $("#table_product").on(
            "click",
            ".btn-warning.btn-rounded.product-edit",
            function() {
                var currentRow = $(this).closest("tr");
                // get all value in row
                const product_id = currentRow.find("td:eq(0)").text();
                const name = currentRow.find("td:eq(1)").text();
                const description = currentRow.find("td:eq(3)").text();
                const universe = currentRow.find("td:eq(4)").text();
                const price = currentRow.find("td:eq(5)").text();
                const link = currentRow.find("td:eq(6)").text();
                const eGrade = currentRow.find("td:eq(2)").text();

                alert(
                    "you are editing product with id= " +
                    product_id +
                    " and name= " +
                    name +
                    " grade= " +
                    eGrade +
                    " link= " +
                    link
                );

                $.post(
                    "/product/resource", { product_id, name, eGrade, description, universe, price, link },
                    function(result) {
                        alert("edit product: " + result);
                        if (result == "success") {
                            location.reload(true);
                        }
                    }
                );
            }
        );
    }
    //-------------------------------------------------------------------------------------------------------------------


    //--------------------------------------- PAGINATION WITH FILTER IN QUERY STRING ------------------------------------

    function pagesRender_filter() {
        const pageArray = $("div.nav-link-filter> a");
        const currrentPage = $("#currpageVar");
        const pageNumberInt = parseInt(currrentPage.text());
        const orderNumber = [-2, -1, 0, 1, 2];
        const searchQuery = $("#filter_value").text();

        // This is a loop that go through all element of pageItem class
        if (pageNumberInt > 3) {
            pageArray.each(function(i = 1, pages = $(this)) {
                const page = $(this).text();
                console.log("loop number: " + i);
                console.log("item: " + page);

                let changeto = pageNumberInt;
                changeto = changeto + orderNumber[i];
                console.log("change to: " + changeto);

                // changing text and link
                $(this).text(changeto);
                $(this).attr("href", () => {
                    const url = searchQuery+"&page=" + changeto;
                    console.log("page change: " + url);
                    return url;
                });
            });
        }

        pageArray.each(function(i = 1, pages = $(this)) {
            const page = $(this).text();
            console.log("loop number: " + i);
            console.log("item: " + page);
            if (parseInt(page) == parseInt(currrentPage.text())) {
                console.log("found matching page: " + page + "|" + currrentPage.text());
                $(this).toggleClass("current");
                return false;
            }
            i++;
        });
    }

    function pageination_toggle_current_page_filter() {
        const pageItem = $("div.nav-link-filter > a");
        const pageCurr = $("#currpage");

        // This is a loop that go through all element of pageItem class
        pageItem.each(function(i = 1, pages = $(this)) {
            let pages_number = $(this).text();
            console.log("loop number: " + i);
            console.log("item: " + pages_number);

            // Find the current page to toggle
            if (parseInt(pages_number) == parseInt(pageCurr.text())) {
                console.log(
                    "found matching page: " + pages_number + " " + pageCurr.text()
                );
                $(this).toggleClass("current");
                return;
            }
            i++;
        });
    }

    function nextpage_click_filter() {
        const pageItem = $("div.nav-link-filter > a");
        const pageCurr = $("#currpageVar");
        const next_page_button = $("#next_page");
        const searchQuery = $("#filter_value").text();

        // when click on next page button we will loop through all page => find current page => click on next page
        next_page_button.click(() => {
            const pageNumberInt = parseInt(pageCurr.text(), 10);

            console.log("current page: " + pageNumberInt);

            pageItem.each(function(i = 1, pages = $(this)) {
                console.log("loop number : " + i);

                // if page is full we have to make new pages array
                if (i == 4) {
                    console.log("page full");
                    pageItem.each(function(j = 1, pages = $(this)) {
                        let changeto = pageNumberInt;
                        changeto = changeto + j;
                        console.log("change to: " + changeto);

                        // changing text and link
                        $(this).text(changeto);
                        $(this).attr("href", () => {
                            const url = searchQuery+"&page=" + changeto;;
                            console.log("page change: " + url);
                            return url;
                        });
                    });
                    return false;
                }
                let pages_number = $(this).text();
                // Find the current page to click next page
                if (parseInt(pages_number) == parseInt(pageCurr.text())) {
                    const next_page = $(this).next();
                    console.log("next page is: " + next_page.text());
                    if (next_page.text() == "") {
                        console.log("page full");
                    } else {
                        next_page[0].click();
                        return false;
                    }
                }
                i++;
            });
        });
    }

    function prevpage_click_filter() {
        const pageItem = $("div.nav-link-filter > a");
        const pageCurr = $("#currpageVar");
        const prev_page_button = $("#prev_page");

        // when click on next page button we will loop through all page => find current page => click on prev page
        prev_page_button.click(() => {
            pageItem.each(function(i = 1, pages = $(this)) {
                let pages_number = $(this).text();
                // Find the current page to click next page
                if (parseInt(pages_number) == parseInt(pageCurr.text())) {
                    const prev_page = $(this).prev();
                    prev_page[0].click();
                }
                i++;
            });
        });
    }


    
 
    // ------------------------------------------------------------------------------------------------------------------
    $(window).scroll(function() {
        tanajil_custom_scrollbar();
    });
    $(window).resize(function() {
        quickview_popup();
        tanajil_masonry();
        kt_resizeMegamenu();
        tanajil_remove_class_review();
        tanajil_details_thumd_zoom();
        tanajil_custom_scrollbar();
    });
    $(window).load(function() {
        newletter_popup();
        quickview_popup();
        tanajil_mobile_block();
        tanajil_remove_class_review();
        tanajil_custom_scrollbar();
    });
    tanajil_masonry();
    tanajil_dropdown();
    tanajil_init_carousel();
    tanajil_remove_class_review();
    tanajil_tab_fade_effect();
    tanajil_details_thumd_zoom();
    tanajil_video();
    kt_resizeMegamenu();
    tanajil_custom_scrollbar();
    tanajil_countdown();
    tanajil_init_menu_toggle();
    tanajil_custom_scrollbar_header_nav();

    // beamsaber script
    pageination_toggle_current_page();
    nextpage_click();
    prevpage_click();
    delete_product();
    addProduct();
    editProductButton();
    pagesRender();
    nextpage_click();
    prevpage_click();
    pagesRender_filter();
    pageination_toggle_current_page_filter();
    nextpage_click_filter();
    prevpage_click_filter();
    editAccountButton();
    delete_account();
    
});