/**
 * ============================================================
 * FLEXEN NAVIGATION
 * ============================================================
 *
 * Handles:
 * - Active navigation links
 * - Internal navigation
 * - Navbar accessibility
 * - Closing open menus when navigating
 * - Keyboard navigation support
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

    document.addEventListener("DOMContentLoaded", function () {

        initNavigation();

    });


    /* =========================================================
       MAIN NAVIGATION INITIALIZATION
    ========================================================== */

    function initNavigation() {

        const navbar = document.querySelector(".navbar");

        if (!navbar) {
            return;
        }


        setupActiveNavigation();

        setupNavigationLinks();

        setupKeyboardNavigation();

        setupOutsideNavigationClose();

    }


    /* =========================================================
       ACTIVE NAVIGATION
    ========================================================== */

    function setupActiveNavigation() {

        const currentPath = normalizePath(
            window.location.pathname
        );

        const navigationLinks = document.querySelectorAll(
            ".navbar__desktop a[href], " +
            ".mobile-navigation a[href]"
        );


        navigationLinks.forEach(function (link) {

            const href = link.getAttribute("href");


            /*
             * Ignore:
             * - external links
             * - anchors
             * - javascript links
             * - empty links
             */

            if (
                !href ||
                href.startsWith("#") ||
                href.startsWith("http") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) {
                return;
            }


            const linkPath = getLinkPath(href);


            if (
                linkPath === currentPath ||
                isHomepageMatch(linkPath, currentPath)
            ) {

                link.classList.add("is-active");

                link.setAttribute(
                    "aria-current",
                    "page"
                );

            }

        });

    }


    /* =========================================================
       NAVIGATION LINKS
    ========================================================== */

    function setupNavigationLinks() {

        const links = document.querySelectorAll(
            ".navbar a[href], .mobile-navigation a[href]"
        );


        links.forEach(function (link) {

            link.addEventListener(
                "click",
                function () {

                    /*
                     * Allow normal browser navigation.
                     *
                     * We only close menus before
                     * navigating to another page.
                     */

                    closeNavigationMenus();

                }
            );

        });

    }


    /* =========================================================
       KEYBOARD NAVIGATION
    ========================================================== */

    function setupKeyboardNavigation() {

        const dropdownTriggers = document.querySelectorAll(
            ".nav-dropdown__trigger"
        );


        dropdownTriggers.forEach(function (trigger) {

            trigger.addEventListener(
                "keydown",
                function (event) {

                    if (event.key === "Escape") {

                        closeDropdown(trigger);

                        trigger.focus();

                    }

                }
            );

        });


        document.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    closeNavigationMenus();

                }

            }
        );

    }


    /* =========================================================
       OUTSIDE CLICK
    ========================================================== */

    function setupOutsideNavigationClose() {

        document.addEventListener(
            "click",
            function (event) {

                const clickedInsideNavbar =
                    event.target.closest(".navbar");

                const clickedInsideMobileNavigation =
                    event.target.closest(
                        ".mobile-navigation"
                    );


                if (
                    !clickedInsideNavbar &&
                    !clickedInsideMobileNavigation
                ) {

                    closeNavigationMenus();

                }

            }
        );

    }


    /* =========================================================
       CLOSE NAVIGATION MENUS
    ========================================================== */

    function closeNavigationMenus() {

        /*
         * Close dropdowns
         */

        const dropdowns = document.querySelectorAll(
            ".nav-dropdown"
        );


        dropdowns.forEach(function (dropdown) {

            const trigger =
                dropdown.querySelector(
                    ".nav-dropdown__trigger"
                );

            const menu =
                dropdown.querySelector(
                    ".nav-dropdown__menu"
                );


            dropdown.classList.remove("is-open");


            if (trigger) {

                trigger.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            if (menu) {

                menu.hidden = true;

            }

        });


        /*
         * Close mobile navigation
         */

        const mobileNavigation =
            document.querySelector(
                "#mobile-navigation"
            );

        const mobileToggle =
            document.querySelector(
                ".mobile-menu-toggle"
            );


        if (mobileNavigation) {

            mobileNavigation.hidden = true;

        }


        if (mobileToggle) {

            mobileToggle.classList.remove(
                "is-open"
            );

            mobileToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

        }

    }


    /* =========================================================
       CLOSE SINGLE DROPDOWN
    ========================================================== */

    function closeDropdown(trigger) {

        const dropdown =
            trigger.closest(".nav-dropdown");


        if (!dropdown) {
            return;
        }


        const menu =
            dropdown.querySelector(
                ".nav-dropdown__menu"
            );


        dropdown.classList.remove(
            "is-open"
        );


        trigger.setAttribute(
            "aria-expanded",
            "false"
        );


        if (menu) {

            menu.hidden = true;

        }

    }


    /* =========================================================
       NORMALIZE PATH
    ========================================================== */

    function normalizePath(path) {

        if (!path) {
            return "/";
        }


        /*
         * Remove query strings
         */

        path = path.split("?")[0];


        /*
         * Remove hash
         */

        path = path.split("#")[0];


        /*
         * Convert Windows-style slashes
         */

        path = path.replace(/\\/g, "/");


        /*
         * Remove duplicate slashes
         */

        path = path.replace(/\/+/g, "/");


        /*
         * Ensure leading slash
         */

        if (!path.startsWith("/")) {

            path = "/" + path;

        }


        /*
         * Treat index.html as homepage
         */

        if (
            path === "/index.html" ||
            path.endsWith("/index.html")
        ) {

            path = path.replace(
                /index\.html$/,
                ""
            );

        }


        /*
         * Remove trailing slash except root
         */

        if (
            path.length > 1 &&
            path.endsWith("/")
        ) {

            path = path.slice(
                0,
                -1
            );

        }


        return path;

    }


    /* =========================================================
       GET LINK PATH
    ========================================================== */

    function getLinkPath(href) {

        try {

            const url = new URL(
                href,
                window.location.href
            );


            return normalizePath(
                url.pathname
            );

        } catch (error) {

            return normalizePath(
                href
            );

        }

    }


    /* =========================================================
       HOMEPAGE MATCH
    ========================================================== */

    function isHomepageMatch(
        linkPath,
        currentPath
    ) {

        const homepagePaths = [
            "/",
            "/index.html"
        ];


        return (
            homepagePaths.includes(linkPath) &&
            homepagePaths.includes(currentPath)
        );

    }


    /* =========================================================
       PUBLIC API
    ========================================================== */

    window.FLEXENNavigation = {

        close: closeNavigationMenus,

        closeDropdown: closeDropdown

    };


})();