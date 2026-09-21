/**
 * ============================================================
 * FLEXEN MOBILE MENU
 * ============================================================
 *
 * Handles:
 * - Mobile menu open / close
 * - Hamburger button animation
 * - aria-expanded
 * - aria-label
 * - Mobile navigation visibility
 * - Closing menu after selecting a link
 * - Escape key support
 * - Preventing background scroll
 *
 * FLEXEN
 * Global Sourcing & Procurement
 * ============================================================
 */

(function () {

    "use strict";


    /* =========================================================
       DOM READY
    ========================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            initMobileMenu();

        }
    );


    /* =========================================================
       INITIALIZE
    ========================================================== */

    function initMobileMenu() {

        const toggle =
            document.querySelector(
                ".mobile-menu-toggle"
            );

        const navigation =
            document.querySelector(
                "#mobile-navigation"
            );


        /*
         * If either element does not exist,
         * there is nothing to initialize.
         */

        if (
            !toggle ||
            !navigation
        ) {

            return;

        }


        setupToggle(
            toggle,
            navigation
        );

        setupNavigationLinks(
            toggle,
            navigation
        );

        setupEscapeKey(
            toggle,
            navigation
        );

        setupResizeHandler(
            toggle,
            navigation
        );

    }


    /* =========================================================
       TOGGLE BUTTON
    ========================================================== */

    function setupToggle(
        toggle,
        navigation
    ) {

        toggle.addEventListener(
            "click",
            function () {

                const isOpen =
                    toggle.getAttribute(
                        "aria-expanded"
                    ) === "true";


                if (isOpen) {

                    closeMenu(
                        toggle,
                        navigation
                    );

                } else {

                    openMenu(
                        toggle,
                        navigation
                    );

                }

            }
        );

    }


    /* =========================================================
       OPEN MENU
    ========================================================== */

    function openMenu(
        toggle,
        navigation
    ) {

        /*
         * Make mobile navigation visible.
         */

        navigation.hidden = false;


        /*
         * Update toggle state.
         */

        toggle.classList.add(
            "is-open"
        );


        toggle.setAttribute(
            "aria-expanded",
            "true"
        );


        toggle.setAttribute(
            "aria-label",
            "Close navigation"
        );


        /*
         * Prevent the page behind the
         * mobile menu from scrolling.
         */

        document.body.classList.add(
            "mobile-menu-open"
        );

    }


    /* =========================================================
       CLOSE MENU
    ========================================================== */

    function closeMenu(
        toggle,
        navigation
    ) {

        /*
         * Hide mobile navigation.
         */

        navigation.hidden = true;


        /*
         * Reset hamburger.
         */

        toggle.classList.remove(
            "is-open"
        );


        toggle.setAttribute(
            "aria-expanded",
            "false"
        );


        toggle.setAttribute(
            "aria-label",
            "Open navigation"
        );


        /*
         * Restore page scrolling.
         */

        document.body.classList.remove(
            "mobile-menu-open"
        );

    }


    /* =========================================================
       MOBILE NAVIGATION LINKS
    ========================================================== */

    function setupNavigationLinks(
        toggle,
        navigation
    ) {

        const links =
            navigation.querySelectorAll(
                "a"
            );


        links.forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function () {

                        closeMenu(
                            toggle,
                            navigation
                        );

                    }
                );

            }
        );

    }


    /* =========================================================
       ESCAPE KEY
    ========================================================== */

    function setupEscapeKey(
        toggle,
        navigation
    ) {

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key !== "Escape"
                ) {

                    return;

                }


                const isOpen =
                    toggle.getAttribute(
                        "aria-expanded"
                    ) === "true";


                if (isOpen) {

                    closeMenu(
                        toggle,
                        navigation
                    );


                    /*
                     * Return focus to the
                     * hamburger button.
                     */

                    toggle.focus();

                }

            }
        );

    }


    /* =========================================================
       RESIZE HANDLER
    ========================================================== */

    function setupResizeHandler(
        toggle,
        navigation
    ) {

        let resizeTimer;


        window.addEventListener(
            "resize",
            function () {

                clearTimeout(
                    resizeTimer
                );


                resizeTimer =
                    setTimeout(
                        function () {

                            /*
                             * When returning to desktop,
                             * automatically close the
                             * mobile navigation.
                             */

                            if (
                                window.innerWidth > 1000
                            ) {

                                closeMenu(
                                    toggle,
                                    navigation
                                );

                            }

                        },
                        150
                    );

            }
        );

    }


    /* =========================================================
       PUBLIC API
    ========================================================== */

    window.FLEXENMobileMenu = {

        open: function () {

            const toggle =
                document.querySelector(
                    ".mobile-menu-toggle"
                );

            const navigation =
                document.querySelector(
                    "#mobile-navigation"
                );


            if (
                toggle &&
                navigation
            ) {

                openMenu(
                    toggle,
                    navigation
                );

            }

        },


        close: function () {

            const toggle =
                document.querySelector(
                    ".mobile-menu-toggle"
                );

            const navigation =
                document.querySelector(
                    "#mobile-navigation"
                );


            if (
                toggle &&
                navigation
            ) {

                closeMenu(
                    toggle,
                    navigation
                );

            }

        },


        toggle: function () {

            const toggle =
                document.querySelector(
                    ".mobile-menu-toggle"
                );

            const navigation =
                document.querySelector(
                    "#mobile-navigation"
                );


            if (
                !toggle ||
                !navigation
            ) {

                return;

            }


            const isOpen =
                toggle.getAttribute(
                    "aria-expanded"
                ) === "true";


            if (isOpen) {

                closeMenu(
                    toggle,
                    navigation
                );

            } else {

                openMenu(
                    toggle,
                    navigation
                );

            }

        }

    };


})();