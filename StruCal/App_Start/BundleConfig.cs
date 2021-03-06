﻿using System.Web;
using System.Web.Optimization;

namespace StruCal
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        //"~/Scripts/jquery-{version}.js"));
                        "~/Scripts/jquery-1.10.2.min.js"));
            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/custom").Include(
                      "~/Scripts/custom.js",
                      "~/Scripts/jquery-ui.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"
                      ));

            bundles.Add(new ScriptBundle("~/bundles/svg").Include(
                "~/Scripts/svg.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/drawing").Include(
                "~/Scripts/drawing.js"));
            bundles.Add(new ScriptBundle("~/bundles/concreteProperties").Include(
                "~/Scripts/concreteProperties.js"));

            bundles.Add(new StyleBundle("~/Content/custom").Include(
                "~/Content/jquery-ui.css",
                "~/Content/custom.css"));
            bundles.Add(new StyleBundle("~/Content/checkBoxes").Include(
                "~/Content/checkBoxes.css"
            ));

            bundles.Add(new ScriptBundle("~/bundles/sectionProperties").Include(
                "~/Scripts/sectionProperties.js"));

            bundles.Add(new ScriptBundle("~/bundles/shearReinforcement").Include(
                "~/Scripts/shearReinforcement.js"));

            bundles.Add(new ScriptBundle("~/bundles/concreteCover").Include(
                "~/Scripts/cover.js"));

            bundles.Add(new StyleBundle("~/Content/PanelTabs").Include(
                "~/Content/PanelTabs.css"));

            bundles.Add(new StyleBundle("~/Content/angular").Include(
                "~/Content/angular.css"));
            bundles.Add(new ScriptBundle("~/bundles/angularShared").Include(
                "~/Scripts/AngularShared/angularShared.js",
                "~/Scripts/AngularShared/numberFormatter.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/rcBeam").Include(
                "~/Scripts/RcBeam/rcBeamApp.js",
                "~/Scripts/RcBeam/Drawings/circularSectionDrawing.js",
                "~/Scripts/RcBeam/Drawings/customSectionDrawing.js",
                "~/Scripts/RcBeam/Drawings/drawingHelpers.js",
                "~/Scripts/RcBeam/Drawings/rcDrawing.js",
                "~/Scripts/RcBeam/Drawings/rectangleSectionDrawing.js",
                "~/Scripts/RcBeam/Helper/multipliers.js",
                "~/Scripts/RcBeam/MainPageControllers/controlPanelCtrl.js",
                "~/Scripts/RcBeam/MainPageControllers/detailedResultPanel.js",
                "~/Scripts/RcBeam/MainPageControllers/drawingPanelCtrl.js",
                "~/Scripts/RcBeam/MainPageControllers/inputPanelCtrl.js",
                "~/Scripts/RcBeam/MainPageControllers/resultPanelCtrl.js",
                "~/Scripts/RcBeam/Materials/concreteService.js",
                "~/Scripts/RcBeam/Materials/steelService.js",
                "~/Scripts/RcBeam/ModalControllers/circularSectionCtrl.js",
                "~/Scripts/RcBeam/ModalControllers/coefficientsCtrl.js",
                "~/Scripts/RcBeam/ModalControllers/concreteCtrl.js",
                "~/Scripts/RcBeam/ModalControllers/customSectionCtrl.js",
                "~/Scripts/RcBeam/ModalControllers/loadsCtrl.js",
                "~/Scripts/RcBeam/ModalControllers/rectangularSectionCtrl.js",
                "~/Scripts/RcBeam/ModalControllers/steelCtrl.js",
                "~/Scripts/RcBeam/Services/chartService.js"
                ));

            bundles.Add(new StyleBundle("~/Content/Membrane").Include(
                "~/Content/Membrane.css"));

            bundles.Add(new StyleBundle("~/Content/PanelTabs").Include(
                "~/Content/PanelTabs.css"));

            bundles.Add(new ScriptBundle("~/bundles/ThreeJS").Include(
                "~/Scripts/Membrane/lib/three.js",
                "~/Scripts/Membrane/lib/OrbitControls.js",
                "~/Scripts/Membrane/lib/rainbowvis.js",
                "~/Scripts/Membrane/lib/TrackballControls.js"
                ));


            bundles.Add(new ScriptBundle("~/bundles/Membrane").Include(
                "~/Scripts/Membrane/src/drawingUtils/nodeTransformation.js",
                "~/Scripts/Membrane/src/drawingUtils/pointLoadProvider.js",
                "~/Scripts/Membrane/src/drawingUtils/scaleCalculator.js",
                "~/Scripts/Membrane/src/drawingUtils/supportProvider.js",
                "~/Scripts/Membrane/src/API.js",
                "~/Scripts/Membrane/src/colorProvider.js",
                "~/Scripts/Membrane/src/drawingCreator.js",
                "~/Scripts/Membrane/src/inputCreator.js",
                "~/Scripts/Membrane/src/outputCreator.js",
                "~/Scripts/Membrane/src/pointLoadCreator.js",
                "~/Scripts/Membrane/src/resultProvider.js",
                "~/Scripts/Membrane/src/supportCreator.js",
                "~/Scripts/Membrane/src/textCreator.js",
                "~/Scripts/Membrane/utils/Number.js",
                "~/Scripts/Membrane/index.js",
                "~/Scripts/Membrane/Services/inputDataCalculator.js",
                "~/Scripts/Membrane/Services/inputDataFactory.js",
                "~/Scripts/Membrane/Services/canvasFactory.js",
                "~/Scripts/Membrane/Services/drawingService.js",
                "~/Scripts/Membrane/Controllers/calculationsCtrl.js",
                "~/Scripts/Membrane/Controllers/geometryCtrl.js",
                "~/Scripts/Membrane/Controllers/propertiesCtrl.js",
                "~/Scripts/Membrane/Controllers/controlPanelCtrl.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/progress").Include(
                "~/Scripts/progressBar.js",
                "~/Scripts/progress.js"));

            bundles.Add(new ScriptBundle("~/bundles/layoutScript").Include(
                "~/Scripts/layoutScript.js"));

            bundles.Add(new ScriptBundle("~/bundles/cookieBar").Include(
                "~/Scripts/cookieBar.js"));
            bundles.Add(new StyleBundle("~/Content/cookieBar").Include(
                "~/Content/cookieBar.css"));

            bundles.Add(new ScriptBundle("~/bundles/home").Include(
               "~/Scripts/home.js"));
            bundles.Add(new ScriptBundle("~/bundles/FEA").Include(
                "~/Scripts/FEA/FEAApp.js"));
#if !DEBUG
            BundleTable.EnableOptimizations = true;
#endif
        }
    }
}
