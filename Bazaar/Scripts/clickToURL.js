/*
    clickToURL.js

    Created by Kalila L. on 3 Aug 2020
    Copyright 2020 Vircadia and contributors.
    
    Distributed under the Apache License, Version 2.0.
    See the accompanying file LICENSE or http://www.apache.org/licenses/LICENSE-2.0.html
*/

(function () {
    "use strict";
    this.entityID = null;
    var _this = this;

    var overlayWebWindow;

    var defaultUserData = {
        "useConfirmDialog": false
    }

    function getURLfromEntityDescription() {
        return Entities.getEntityProperties(_this.entityID, ["description"]).description;
    }

    function getEntityUserData() {
        return Entities.getEntityProperties(_this.entityID, ["userData"]).userData;
    }

    function setDefaultUserData() {
        Entities.editEntity(_this.entityID, {
            userData: JSON.stringify(defaultUserData)
        });
    }

    function createOverlayWebWindow() {
        overlayWebWindow = new OverlayWebWindow({
            title: "Vircadia Browser",
            source: getURLfromEntityDescription(),
            width: 800,
            height: 600
        });
    }

    function onMousePressOnEntity(pressedEntityID, event) {
        if (_this.entityID === pressedEntityID) {
            var userData = getEntityUserData();

            try {
                userData = Object(JSON.parse(userData)); 
            } catch (e) {
                userData = defaultUserData; setDefaultUserData(); 
            }

            if (userData.useConfirmDialog === true) {
                if (Window.confirm("Are you sure you want to open this link?")) {
                    console.log("LOL");
                    createOverlayWebWindow();
                }
            } else {
                createOverlayWebWindow();
            }
        }
    }


    // Standard preload and unload, initialize the entity script here.

    this.preload = function (ourID) {
        this.entityID = ourID;
        setDefaultUserData();
        
        Entities.mousePressOnEntity.connect(onMousePressOnEntity);
    };

    this.unload = function (entityID) {
        Entities.mousePressOnEntity.disconnect(onMousePressOnEntity);
    };

});