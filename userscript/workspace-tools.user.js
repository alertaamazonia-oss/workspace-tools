// ==UserScript==
// @name         Workspace Tools
// @namespace    https://github.com/alertaamazonia-oss/workspace-tools
// @version      1.0.0
// @description  Browser enhancements for the MapBiomas Alerta Workspace.
// @author       Santiago Baquero
// @license      MIT
//
// @match        https://colombia-alerta-workspace.mapbiomas.org/alerts/audit*
//
// @homepageURL  https://github.com/alertaamazonia-oss/workspace-tools
// @supportURL   https://github.com/alertaamazonia-oss/workspace-tools/issues
//
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    //--------------------------------------------
    // CONFIGURACIÓN
    //--------------------------------------------

    const CONFIG = {
        columnas: 2,          // 1, 2 o 3
        gapImagenes: "4px",
        aspecto: "1 / 1",
        observarDOM: true
    };

    //--------------------------------------------
    // Aplicar mejoras
    //--------------------------------------------

    function mejorarLayout() {

        //--------------------------
        // Grid principal
        //--------------------------

        const gridPrincipal = document.querySelector(
            ".grid.grid-cols-3.gap-4"
        );

        if (gridPrincipal) {

            gridPrincipal.style.gridTemplateColumns =
                `repeat(${CONFIG.columnas}, minmax(0,1fr))`;

            gridPrincipal.style.maxWidth = "100%";
        }

        //--------------------------
        // Before / After
        //--------------------------

        document.querySelectorAll(".grid.grid-cols-2.gap-2")
            .forEach(g => {

                g.style.gap = CONFIG.gapImagenes;

            });

        //--------------------------
        // Imágenes
        //--------------------------

        document.querySelectorAll(".aspect-\\[4\\/3\\]")
            .forEach(caja => {

                caja.style.aspectRatio = CONFIG.aspecto;

            });

    }

    //--------------------------------------------
    // Esperar a que React renderice
    //--------------------------------------------

    function iniciar() {

        mejorarLayout();

        if (!CONFIG.observarDOM)
            return;

        const observer = new MutationObserver(() => {

            mejorarLayout();

        });

        observer.observe(document.body, {

            childList: true,
            subtree: true

        });

    }

    //--------------------------------------------
    // Botón flotante
    //--------------------------------------------

    function crearBoton() {

        const boton = document.createElement("button");

        boton.innerText = "🛰 Auditor";

        Object.assign(boton.style, {

            position: "fixed",
            right: "18px",
            bottom: "18px",

            zIndex: 999999,

            padding: "10px 14px",

            background: "#1976D2",
            color: "white",

            border: "none",
            borderRadius: "8px",

            cursor: "pointer",

            boxShadow: "0 4px 10px rgba(0,0,0,.3)"

        });

        boton.onclick = () => {

            CONFIG.columnas++;

            if (CONFIG.columnas > 3)
                CONFIG.columnas = 1;

            mejorarLayout();

            boton.innerText =
                `🛰 ${CONFIG.columnas} columna${CONFIG.columnas > 1 ? "s" : ""}`;

        };

        document.body.appendChild(boton);

    }

    //--------------------------------------------

    window.addEventListener("load", () => {

        iniciar();

        crearBoton();

    });

})();
