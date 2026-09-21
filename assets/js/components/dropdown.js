
/**
 * ============================================================
 * FLEXEN NAVIGATION DROPDOWNS
 * ============================================================
 *
 * Handles:
 * - Desktop dropdown menus
 * - Click to open / close
 * - aria-expanded
 * - Keyboard accessibility
 * - Escape key
 * - Outside click
 * - One dropdown open at a time
 *
 * IMPORTANT:
 * Hover is intentionally NOT controlled by JavaScript.
 * This prevents dropdown flickering and accidental closing.
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

            initDropdowns();

        }
    );


    /* =========================================================
       INITIALIZE
    ========================================================== */

    function initDropdowns() {

        const dropdowns =
            document.querySelectorAll(
                ".nav-dropdown"
            );


        if (!dropdowns.length) {

            return;

        }


        dropdowns.forEach(
            function (dropdown) {

                setupDropdown(
                    dropdown
                );

            }
        );


        setupOutsideClick();

        setupGlobalEscape();

    }


    /* =========================================================
       SETUP DROPDOWN
    ========================================================== */

    function setupDropdown(
        dropdown
    ) {

        const trigger =
            dropdown.querySelector(
                ".nav-dropdown__trigger"
            );

        const menu =
            dropdown.querySelector(
                ".nav-dropdown__menu"
            );


        if (
            !trigger ||
            !menu
        ) {

            return;

        }


        /*
         * Establish initial state.
         */

        closeDropdown(
            dropdown
        );


        /* =====================================================
           CLICK
        ====================================================== */

        trigger.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                const isOpen =
                    dropdown.classList.contains(
                        "is-open"
                    );


                /*
                 * Close every other dropdown.
                 */

                closeAllDropdowns(
                    dropdown
                );


                /*
                 * Toggle current dropdown.
                 */

                if (isOpen) {

                    closeDropdown(
                        dropdown
                    );

                } else {

                    openDropdown(
                        dropdown
                    );

                }

            }
        );


        /* =====================================================
           KEYBOARD — TRIGGER
        ====================================================== */

        trigger.addEventListener(
            "keydown",
            function (event) {

                handleTriggerKeyboard(
                    event,
                    dropdown,
                    trigger,
                    menu
                );

            }
        );


        /* =====================================================
           KEYBOARD — MENU
        ====================================================== */

        menu.addEventListener(
            "keydown",
            function (event) {

                handleMenuKeyboard(
                    event,
                    dropdown,
                    trigger,
                    menu
                );

            }
        );


        /* =====================================================
           MENU CLICK
        ====================================================== */

        menu.addEventListener(
            "click",
            function (event) {

                /*
                 * If a real link was clicked,
                 * close the dropdown before navigation.
                 */

                const link =
                    event.target.closest(
                        "a[href]"
                    );


                if (link) {

                    closeDropdown(
                        dropdown
                    );

                }

            }
        );

    }


    /* =========================================================
       OPEN DROPDOWN
    ========================================================== */

    function openDropdown(
        dropdown
    ) {

        const trigger =
            dropdown.querySelector(
                ".nav-dropdown__trigger"
            );

        const menu =
            dropdown.querySelector(
                ".nav-dropdown__menu"
            );


        if (
            !trigger ||
            !menu
        ) {

            return;

        }


        /*
         * Close other dropdowns first.
         */

        closeAllDropdowns(
            dropdown
        );


        /*
         * Open current dropdown.
         */

        dropdown.classList.add(
            "is-open"
        );


        trigger.setAttribute(
            "aria-expanded",
            "true"
        );


        menu.hidden = false;

    }


    /* =========================================================
       CLOSE DROPDOWN
    ========================================================== */

    function closeDropdown(
        dropdown
    ) {

        const trigger =
            dropdown.querySelector(
                ".nav-dropdown__trigger"
            );

        const menu =
            dropdown.querySelector(
                ".nav-dropdown__menu"
            );


        if (
            !trigger ||
            !menu
        ) {

            return;

        }


        dropdown.classList.remove(
            "is-open"
        );


        trigger.setAttribute(
            "aria-expanded",
            "false"
        );


        menu.hidden = true;

    }


    /* =========================================================
       CLOSE ALL DROPDOWNS
    ========================================================== */

    function closeAllDropdowns(
        exceptDropdown = null
    ) {

        const dropdowns =
            document.querySelectorAll(
                ".nav-dropdown"
            );


        dropdowns.forEach(
            function (dropdown) {

                if (
                    dropdown !==
                    exceptDropdown
                ) {

                    closeDropdown(
                        dropdown
                    );

                }

            }
        );

    }


    /* =========================================================
       TRIGGER KEYBOARD
    ========================================================== */

    function handleTriggerKeyboard(
        event,
        dropdown,
        trigger,
        menu
    ) {

        switch (
            event.key
        ) {


            /* -------------------------------------------------
               ENTER
            -------------------------------------------------- */

            case "Enter":

                event.preventDefault();

                toggleDropdown(
                    dropdown
                );

                break;


            /* -------------------------------------------------
               SPACE
            -------------------------------------------------- */

            case " ":

                event.preventDefault();

                toggleDropdown(
                    dropdown
                );

                break;


            /* -------------------------------------------------
               ARROW DOWN
            -------------------------------------------------- */

            case "ArrowDown":

                event.preventDefault();


                openDropdown(
                    dropdown
                );


                focusFirstMenuItem(
                    menu
                );

                break;


            /* -------------------------------------------------
               ESCAPE
            -------------------------------------------------- */

            case "Escape":

                event.preventDefault();


                closeDropdown(
                    dropdown
                );


                trigger.focus();

                break;

        }

    }


    /* =========================================================
       TOGGLE DROPDOWN
    ========================================================== */

    function toggleDropdown(
        dropdown
    ) {

        const isOpen =
            dropdown.classList.contains(
                "is-open"
            );


        closeAllDropdowns(
            dropdown
        );


        if (isOpen) {

            closeDropdown(
                dropdown
            );

        } else {

            openDropdown(
                dropdown
            );

        }

    }


    /* =========================================================
       MENU KEYBOARD NAVIGATION
    ========================================================== */

    function handleMenuKeyboard(
        event,
        dropdown,
        trigger,
        menu
    ) {

        const items =
            getMenuItems(
                menu
            );


        if (!items.length) {

            return;

        }


        const currentIndex =
            items.indexOf(
                document.activeElement
            );


        switch (
            event.key
        ) {


            /* -------------------------------------------------
               DOWN
            -------------------------------------------------- */

            case "ArrowDown":

                event.preventDefault();


                focusMenuItem(
                    items,
                    currentIndex + 1
                );

                break;


            /* -------------------------------------------------
               UP
            -------------------------------------------------- */

            case "ArrowUp":

                event.preventDefault();


                if (
                    currentIndex <= 0
                ) {

                    trigger.focus();

                } else {

                    focusMenuItem(
                        items,
                        currentIndex - 1
                    );

                }

                break;


            /* -------------------------------------------------
               HOME
            -------------------------------------------------- */

            case "Home":

                event.preventDefault();


                focusMenuItem(
                    items,
                    0
                );

                break;


            /* -------------------------------------------------
               END
            -------------------------------------------------- */

            case "End":

                event.preventDefault();


                focusMenuItem(
                    items,
                    items.length - 1
                );

                break;


            /* -------------------------------------------------
               ESCAPE
            -------------------------------------------------- */

            case "Escape":

                event.preventDefault();


                closeDropdown(
                    dropdown
                );


                trigger.focus();

                break;


            /* -------------------------------------------------
               LEFT
            -------------------------------------------------- */

            case "ArrowLeft":

                event.preventDefault();


                closeDropdown(
                    dropdown
                );


                moveToAdjacentDropdown(
                    dropdown,
                    "previous"
                );

                break;


            /* -------------------------------------------------
               RIGHT
            -------------------------------------------------- */

            case "ArrowRight":

                event.preventDefault();


                closeDropdown(
                    dropdown
                );


                moveToAdjacentDropdown(
                    dropdown,
                    "next"
                );

                break;

        }

    }


    /* =========================================================
       GET MENU ITEMS
    ========================================================== */

    function getMenuItems(
        menu
    ) {

        return Array.from(
            menu.querySelectorAll(
                "a[href], button:not([disabled])"
            )
        );

    }


    /* =========================================================
       FOCUS FIRST ITEM
    ========================================================== */

    function focusFirstMenuItem(
        menu
    ) {

        const items =
            getMenuItems(
                menu
            );


        if (
            items.length
        ) {

            items[0].focus();

        }

    }


    /* =========================================================
       FOCUS MENU ITEM
    ========================================================== */

    function focusMenuItem(
        items,
        index
    ) {

        if (
            index >= items.length
        ) {

            index = 0;

        }


        if (
            index < 0
        ) {

            index =
                items.length - 1;

        }


        items[index].focus();

    }


    /* =========================================================
       MOVE BETWEEN DROPDOWNS
    ========================================================== */

    function moveToAdjacentDropdown(
        currentDropdown,
        direction
    ) {

        const dropdowns =
            Array.from(
                document.querySelectorAll(
                    ".navbar__desktop .nav-dropdown"
                )
            );


        const currentIndex =
            dropdowns.indexOf(
                currentDropdown
            );


        if (
            currentIndex === -1
        ) {

            return;

        }


        let nextIndex;


        if (
            direction === "next"
        ) {

            nextIndex =
                currentIndex + 1;

        } else {

            nextIndex =
                currentIndex - 1;

        }


        /*
         * Wrap around.
         */

        if (
            nextIndex >=
            dropdowns.length
        ) {

            nextIndex = 0;

        }


        if (
            nextIndex < 0
        ) {

            nextIndex =
                dropdowns.length - 1;

        }


        const nextDropdown =
            dropdowns[nextIndex];


        const nextTrigger =
            nextDropdown.querySelector(
                ".nav-dropdown__trigger"
            );


        if (
            nextTrigger
        ) {

            nextTrigger.focus();

            openDropdown(
                nextDropdown
            );

        }

    }


    /* =========================================================
       OUTSIDE CLICK
    ========================================================== */

    function setupOutsideClick() {

        document.addEventListener(
            "click",
            function (event) {

                /*
                 * If the click happened inside a dropdown,
                 * don't close it.
                 */

                if (
                    event.target.closest(
                        ".nav-dropdown"
                    )
                ) {

                    return;

                }


                closeAllDropdowns();

            }
        );

    }


    /* =========================================================
       GLOBAL ESCAPE
    ========================================================== */

    function setupGlobalEscape() {

        document.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key !== "Escape"
                ) {

                    return;

                }


                closeAllDropdowns();

            }
        );

    }


    /* =========================================================
       CLOSE DROPDOWNS WHEN MOBILE
    ========================================================== */

    function setupResponsiveBehavior() {

        const mediaQuery =
            window.matchMedia(
                "(max-width: 1000px)"
            );


        function handleResponsiveChange() {

            if (
                mediaQuery.matches
            ) {

                closeAllDropdowns();

            }

        }


        handleResponsiveChange();


        if (
            mediaQuery.addEventListener
        ) {

            mediaQuery.addEventListener(
                "change",
                handleResponsiveChange
            );

        } else {

            mediaQuery.addListener(
                handleResponsiveChange
            );

        }

    }


    /* =========================================================
       INITIALIZE RESPONSIVE BEHAVIOR
    ========================================================== */

    document.addEventListener(
        "DOMContentLoaded",
        function () {

            setupResponsiveBehavior();

        }
    );


    /* =========================================================
       PUBLIC API
    ========================================================== */

    window.FLEXENDropdowns = {

        open: openDropdown,

        close: closeDropdown,

        toggle: toggleDropdown,

        closeAll: function () {

            closeAllDropdowns();

        }

    };


})();