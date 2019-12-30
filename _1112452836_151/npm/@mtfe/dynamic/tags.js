module.exports = {
    tags: {
        "wx-movable-view": [ "c0", [ {
            direction: 8,
            inertia: 9,
            outOfBounds: 10,
            x: 11,
            y: 12,
            damping: 13,
            friction: 14,
            disabled: 15,
            scale: 16,
            scaleMin: 17,
            scaleMax: 18,
            scaleValue: 19,
            animation: 20
        }, {
            catchchange: 21,
            bindchange: 21,
            catchscale: 22,
            bindscale: 22,
            catchhtouchmove: 23,
            bindhtouchmove: 23,
            catchvtouchmove: 24,
            bindvtouchmove: 24
        } ] ],
        "wx-cover-image": [ "c1", [ {
            src: 8
        }, {
            catchload: 9,
            bindload: 9,
            catcherror: 10,
            binderror: 10
        } ] ],
        "wx-cover-view": [ "c2", [ {
            scrollTop: 8
        }, {} ] ],
        "wx-movable-area": [ "c3", [ {
            scaleArea: 8
        }, {} ] ],
        "wx-scroll-view": [ "c4", [ {
            scrollX: 8,
            scrollY: 9,
            upperThreshold: 10,
            lowerThreshold: 11,
            scrollTop: 12,
            scrollLeft: 13,
            scrollIntoView: 14,
            scrollWithAnimation: 15,
            enableBackToTop: 16,
            enableFlex: 17
        }, {
            catchscrolltoupper: 18,
            bindscrolltoupper: 18,
            catchscrolltolower: 19,
            bindscrolltolower: 19,
            catchscroll: 20,
            bindscroll: 20
        } ] ],
        "wx-swiper": [ "c5", [ {
            indicatorDots: 8,
            indicatorColor: 9,
            indicatorActiveColor: 10,
            autoplay: 11,
            current: 12,
            interval: 13,
            duration: 14,
            circular: 15,
            vertical: 16,
            previousMargin: 17,
            nextMargin: 18,
            displayMultipleItems: 19,
            skipHiddenItemLayout: 20,
            easingFunction: 21
        }, {
            catchchange: 22,
            bindchange: 22,
            catchtransition: 23,
            bindtransition: 23,
            catchanimationfinish: 24,
            bindanimationfinish: 24
        } ] ],
        "wx-swiper-item": [ "c6", [ {
            itemId: 8
        }, {} ] ],
        "wx-icon": [ "c8", [ {
            type: 8,
            size: 9,
            color: 10
        }, {} ] ],
        "wx-progress": [ "c9", [ {
            percent: 8,
            showInfo: 9,
            borderRadius: 10,
            fontSize: 11,
            strokeWidth: 12,
            color: 13,
            activeColor: 14,
            backgroundColor: 15,
            active: 16,
            activeMode: 17
        }, {
            catchactiveend: 18,
            bindactiveend: 18
        } ] ],
        "wx-rich-text": [ "c10", [ {
            nodes: 8,
            space: 9
        }, {} ] ],
        "wx-text": [ "c11", [ {
            selectable: 8,
            space: 9,
            decode: 10
        }, {} ] ],
        "wx-button": [ "c12", [ {
            size: 8,
            type: 9,
            plain: 10,
            disabled: 11,
            loading: 12,
            formType: 13,
            openType: 14,
            hoverClass: 15,
            hoverStopPropagation: 16,
            hoverStartTime: 17,
            hoverStayTime: 18,
            lang: 19,
            sessionFrom: 20,
            sendMessageTitle: 21,
            sendMessagePath: 22,
            sendMessageImg: 23,
            appParameter: 24,
            showMessageCard: 25
        }, {
            catchgetuserinfo: 26,
            bindgetuserinfo: 26,
            catchcontact: 27,
            bindcontact: 27,
            catchgetphonenumber: 28,
            bindgetphonenumber: 28,
            catcherror: 29,
            binderror: 29,
            catchopensetting: 30,
            bindopensetting: 30,
            catchlaunchapp: 31,
            bindlaunchapp: 31
        } ] ],
        "wx-checkbox": [ "c13", [ {
            value: 8,
            name: 9,
            disabled: 10,
            checked: 11,
            color: 12
        }, {} ] ],
        "wx-checkbox-group": [ "c14", [ {
            name: 9
        }, {
            catchchange: 8,
            bindchange: 8
        } ] ],
        "wx-editor": [ "c15", [ {
            readOnly: 8,
            placeholder: 9,
            showImgSize: 10,
            showImgToolbar: 11,
            showImgResize: 12
        }, {
            catchready: 13,
            bindready: 13,
            catchfocus: 14,
            bindfocus: 14,
            catchblur: 15,
            bindblur: 15,
            catchinput: 16,
            bindinput: 16,
            catchstatuschange: 17,
            bindstatuschange: 17
        } ] ],
        "wx-form": [ "c16", [ {
            reportSubmit: 8,
            reportSubmitTimeout: 9
        }, {
            catchsubmit: 10,
            bindsubmit: 10,
            catchreset: 11,
            bindreset: 11
        } ] ],
        "wx-input": [ "c17", [ {
            value: 8,
            name: 9,
            type: 10,
            password: 11,
            placeholder: 12,
            placeholderStyle: 13,
            placeholderClass: 14,
            disabled: 15,
            maxlength: 16,
            cursorSpacing: 17,
            autoFocus: 18,
            focus: 19,
            confirmType: 20,
            confirmHold: 21,
            cursor: 22,
            selectionStart: 23,
            selectionEnd: 24,
            adjustPosition: 25
        }, {
            catchinput: 26,
            bindinput: 26,
            catchfocus: 27,
            bindfocus: 27,
            catchblur: 28,
            bindblur: 28,
            catchconfirm: 29,
            bindconfirm: 29,
            catchkeyboardheightchange: 30,
            bindkeyboardheightchange: 30
        } ] ],
        "wx-label": [ "c18", [ {
            for: 8
        }, {} ] ],
        "wx-picker": [ "c19", [ {
            mode: 8,
            name: 9,
            disabled: 10,
            range: 12,
            rangeKey: 13,
            value: 14,
            start: 17,
            end: 18,
            fields: 19,
            customItem: 20
        }, {
            catchcancel: 11,
            bindcancel: 11,
            catchchange: 15,
            bindchange: 15,
            catchcolumnchange: 16,
            bindcolumnchange: 16
        } ] ],
        "wx-picker-view": [ "c20", [ {
            value: 8,
            indicatorStyle: 9,
            indicatorClass: 10,
            maskStyle: 11,
            maskClass: 12
        }, {
            catchchange: 13,
            bindchange: 13,
            catchpickstart: 14,
            bindpickstart: 14,
            catchpickend: 15,
            bindpickend: 15
        } ] ],
        "wx-picker-view-column": [ "c21", [ {}, {} ] ],
        "wx-radio": [ "c22", [ {
            value: 8,
            name: 9,
            checked: 10,
            disabled: 11,
            color: 12
        }, {} ] ],
        "wx-radio-group": [ "c23", [ {
            name: 9
        }, {
            catchchange: 8,
            bindchange: 8
        } ] ],
        "wx-slider": [ "c24", [ {
            name: 8,
            min: 9,
            max: 10,
            step: 11,
            disabled: 12,
            value: 13,
            color: 14,
            selectedColor: 15,
            activeColor: 16,
            backgroundColor: 17,
            blockSize: 18,
            blockColor: 19,
            showValue: 20
        }, {
            catchchange: 21,
            bindchange: 21,
            catchchanging: 22,
            bindchanging: 22
        } ] ],
        "wx-switch": [ "c25", [ {
            checked: 8,
            disabled: 9,
            type: 10,
            name: 11,
            color: 12
        }, {
            catchchange: 13,
            bindchange: 13
        } ] ],
        "wx-textarea": [ "c26", [ {
            value: 8,
            placeholder: 9,
            placeholderStyle: 10,
            placeholderClass: 11,
            disabled: 12,
            maxlength: 13,
            autoFocus: 14,
            focus: 15,
            autoHeight: 16,
            fixed: 17,
            cursorSpacing: 18,
            cursor: 19,
            showConfirmBar: 20,
            selectionStart: 21,
            selectionEnd: 22,
            adjustPosition: 23
        }, {
            catchfocus: 24,
            bindfocus: 24,
            catchblur: 25,
            bindblur: 25,
            catchlinechange: 26,
            bindlinechange: 26,
            catchinput: 27,
            bindinput: 27,
            catchconfirm: 28,
            bindconfirm: 28,
            catchkeyboardheightchange: 29,
            bindkeyboardheightchange: 29
        } ] ],
        "wx-navigator": [ "c28", [ {
            target: 8,
            url: 9,
            openType: 10,
            delta: 11,
            appId: 12,
            path: 13,
            extraData: 14,
            version: 15,
            hoverClass: 16,
            hoverStopPropagation: 17,
            hoverStartTime: 18,
            hoverStayTime: 19
        }, {
            catchsuccess: 20,
            bindsuccess: 20,
            catchfail: 21,
            bindfail: 21,
            catchcomplete: 22,
            bindcomplete: 22
        } ] ],
        "wx-audio": [ "c29", [ {
            id: 8,
            src: 9,
            loop: 10,
            controls: 11,
            poster: 12,
            name: 13,
            author: 14
        }, {
            catcherror: 15,
            binderror: 15,
            catchplay: 16,
            bindplay: 16,
            catchpause: 17,
            bindpause: 17,
            catchtimeupdate: 18,
            bindtimeupdate: 18,
            catchended: 19,
            bindended: 19
        } ] ],
        "wx-camera": [ "c30", [ {
            mode: 8,
            devicePosition: 9,
            flash: 10,
            frameSize: 11
        }, {
            catchstop: 12,
            bindstop: 12,
            catcherror: 13,
            binderror: 13,
            catchinitdone: 14,
            bindinitdone: 14,
            catchscancode: 15,
            bindscancode: 15
        } ] ],
        "wx-image": [ "c31", [ {
            src: 8,
            mode: 9,
            lazyLoad: 10,
            showMenuByLongpress: 11
        }, {
            catcherror: 12,
            binderror: 12,
            catchload: 13,
            bindload: 13
        } ] ],
        "wx-video": [ "c34", [ {
            src: 8,
            duration: 9,
            controls: 10,
            danmuList: 11,
            danmuBtn: 12,
            enableDanmu: 13,
            autoplay: 14,
            loop: 15,
            muted: 16,
            initialTime: 17,
            pageGesture: 18,
            direction: 19,
            showProgress: 20,
            showFullscreenBtn: 21,
            showPlayBtn: 22,
            showCenterPlayBtn: 23,
            enableProgressGesture: 24,
            objectFit: 25,
            poster: 26,
            showMuteBtn: 27,
            title: 28,
            playBtnPosition: 29,
            enablePlayGesture: 30,
            autoPauseIfNavigate: 31,
            autoPauseIfOpenNative: 32,
            vslideGesture: 33,
            vslideGestureInFullscreen: 34
        }, {
            catchplay: 35,
            bindplay: 35,
            catchpause: 36,
            bindpause: 36,
            catchended: 37,
            bindended: 37,
            catchtimeupdate: 38,
            bindtimeupdate: 38,
            catchfullscreenchange: 39,
            bindfullscreenchange: 39,
            catchwaiting: 40,
            bindwaiting: 40,
            catcherror: 41,
            binderror: 41,
            catchprogress: 42,
            bindprogress: 42
        } ] ],
        "wx-map": [ "c35", [ {
            longitude: 8,
            latitude: 9,
            scale: 10,
            markers: 11,
            covers: 12,
            polyline: 13,
            circles: 14,
            controls: 15,
            includePoints: 16,
            showLocation: 17,
            polygons: 18,
            subkey: 19,
            layerStyle: 20,
            rotate: 21,
            skew: 22,
            enable3D: 23,
            showCompass: 24,
            enableOverlooking: 25,
            enableZoom: 26,
            enableScroll: 27,
            enableRotate: 28,
            enableSatellite: 29,
            enableTraffic: 30
        }, {
            catchtap: 31,
            bindtap: 31,
            catchmarkertap: 32,
            bindmarkertap: 32,
            catchcontroltap: 33,
            bindcontroltap: 33,
            catchcallouttap: 34,
            bindcallouttap: 34,
            catchupdated: 35,
            bindupdated: 35,
            catchregionchange: 36,
            bindregionchange: 36,
            catchpoitap: 37,
            bindpoitap: 37
        } ] ],
        "wx-canvas": [ "c36", [ {
            type: 8,
            canvasId: 9,
            disableScroll: 10
        }, {
            catchtouchstart: 11,
            bindtouchstart: 11,
            catchtouchmove: 12,
            bindtouchmove: 12,
            catchtouchend: 13,
            bindtouchend: 13,
            catchtouchcancel: 14,
            bindtouchcancel: 14,
            catchlongtap: 15,
            bindlongtap: 15,
            catcherror: 16,
            binderror: 16
        } ] ],
        "wx-web-view": [ "c37", [ {
            src: 8
        }, {
            catchmessage: 9,
            bindmessage: 9,
            catchload: 10,
            bindload: 10,
            catcherror: 11,
            binderror: 11
        } ] ],
        "wx-ad": [ "c38", [ {
            unitId: 8,
            adIntervals: 9
        }, {
            catchload: 10,
            bindload: 10,
            catcherror: 11,
            binderror: 11,
            catchclose: 12,
            bindclose: 12
        } ] ],
        "wx-official-account": [ "c39", [ {}, {} ] ],
        "wx-open-data": [ "c40", [ {
            type: 8,
            openGid: 9,
            lang: 10
        }, {} ] ],
        "wx-app-download": [ "n0", [ {
            hongBaoData: 8
        }, {
            catchnoscroll: 17,
            bindnoscroll: 17,
            catchclose: 15,
            bindclose: 15
        } ] ],
        "wx-app-launch": [ "n1", [ {
            launchAppUrl: 8,
            failLaunchUrl: 9,
            appConfig: 10,
            canLaunchApp: 11,
            hasApp: 12,
            needLogin: 13,
            errorParams: 14
        }, {
            catchlauncherror: 15,
            bindlauncherror: 15,
            catchlaunchtap: 16,
            bindlaunchtap: 16
        } ] ],
        "wx-card": [ "n2", [ {
            shopinfo: 8,
            showtag: 9
        }, {
            catchmytap: 10,
            bindmytap: 10
        } ] ],
        "wx-contact-card": [ "n3", [ {
            lxData: 8,
            gotoApp: 9,
            cardData: 10
        }, {
            catchshowpop: 12,
            bindshowpop: 12
        } ] ],
        "wx-coupon-card": [ "n4", [ {
            card: 8
        }, {
            catchnavpage: 9,
            bindnavpage: 9
        } ] ],
        "wx-dish": [ "n5", [ {
            dishlist: 8,
            shopuuid: 9
        }, {
            catchmoreclick: 10,
            bindmoreclick: 10,
            catchopendish: 11,
            bindopendish: 11
        } ] ],
        "wx-group-waterfall-card": [ "n6", [ {
            item: 8,
            index: 9
        }, {} ] ],
        "wx-list-filter": [ "n7", [ {
            selector: 8,
            trigger: 9,
            hasmetro: 10,
            showmetro: 11
        }, {
            catchhandletrigger: 15,
            bindhandletrigger: 15,
            catchfilterlist: 14,
            bindfilterlist: 14,
            catchsurechoice: 16,
            bindsurechoice: 16
        } ] ],
        "wx-list-view": [ "n8", [ {
            listview: 8,
            pulldown: 9,
            reachbottom: 10,
            queryid: 11
        }, {
            catchpulldown: 12,
            bindpulldown: 12,
            catchreachbottom: 13,
            bindreachbottom: 13,
            catchexception: 14,
            bindexception: 14,
            catchtryagain: 15,
            bindtryagain: 15
        } ] ],
        "wx-midas-card": [ "n9", [ {
            card: 8,
            needborderbottom: 9,
            idx: 10,
            needbottom: 11,
            showtag: 12
        }, {
            catchmidascb: 13,
            bindmidascb: 13
        } ] ],
        "wx-midas-dp-deal-list": [ "n10", [ {
            dealGroupId: 8,
            slotId: 9,
            shopId: 10,
            shopUuid: 11,
            shopCityId: 12,
            shopType: 13,
            categoryIds: 14,
            needStarAd: 15
        }, {} ] ],
        "wx-midas": [ "n11", [ {
            env: 8,
            serverType: 9,
            ishttps: 10,
            sendLoadPoint: 11,
            sendReachPoint: 12,
            adidx: 13,
            feedback: 14,
            extra: 15,
            callbackParams: 16,
            jumpLink: 17,
            paddingTop: 18,
            paddingRight: 19,
            paddingBottom: 20,
            paddingLeft: 21
        }, {
            catchclickend: 22,
            bindclickend: 22
        } ] ],
        "wx-mina_lazyload_img": [ "n12", [ {
            imgSrc: 8,
            imgMode: 9,
            imgClass: 10
        }, {
            catchlazyloadsuccess: 11,
            bindlazyloadsuccess: 11,
            catchlazyloaderror: 12,
            bindlazyloaderror: 12
        } ] ],
        "wx-mina-canvas": [ "n13", [ {
            canvasConfig: 8,
            savetoalbum: 9
        }, {
            catchsavecanvas: 10,
            bindsavecanvas: 10,
            catchsavesuccess: 11,
            bindsavesuccess: 11
        } ] ],
        "wx-mina-image": [ "n14", [ {
            src: 8,
            mode: 9,
            lazyLoad: 10,
            componentName: 11
        }, {} ] ],
        "wx-mina-toast": [ "n15", [ {
            toastConfig: 8
        }, {} ] ],
        "wx-mymini-tip": [ "n16", [ {
            pageUrl: 8,
            hasPopup: 9
        }, {
            catchnominitip: 12,
            bindnominitip: 12,
            catchnoscroll: 11,
            bindnoscroll: 11,
            catchclose: 13,
            bindclose: 13
        } ] ],
        "wx-nebula-star": [ "n17", [ {
            star: 8,
            score: 9,
            size: 10,
            fontSize: 11,
            classname: 12,
            isold: 13
        }, {} ] ],
        "wx-footer": [ "n18", [ {
            moreRedirectText: 8,
            channel: 9,
            product: 10,
            poiid: 11,
            currentNavTagId: 12
        }, {
            catchgoToMoreProducts: 13,
            bindgoToMoreProducts: 13
        } ] ],
        "wx-header": [ "n19", [ {
            navData: 8,
            isListPage: 9
        }, {} ] ],
        "wx-nav": [ "n20", [ {
            shelfNavTags: 8,
            level: 9,
            channel: 10,
            isListPage: 11
        }, {
            catchselectCatalog: 12,
            bindselectCatalog: 12
        } ] ],
        "wx-product": [ "n21", [ {
            products: 8,
            channel: 9,
            productLineCount: 10,
            picAspectRatio: 11
        }, {
            catchgoToProductDetail: 12,
            bindgoToProductDetail: 12
        } ] ],
        "wx-entry": [ "n22", [ {
            poiid: 8,
            shelfnavtagid: 9,
            cityid: 10,
            lng: 11,
            lat: 12,
            isListPage: 13,
            channel: 14,
            env: 15
        }, {
            catchlxFirstNavMv: 17,
            bindlxFirstNavMv: 17,
            catchlxSecondNavMv: 18,
            bindlxSecondNavMv: 18,
            catchlXAnalytics: 19,
            bindlXAnalytics: 19,
            catchlxFirstNav: 20,
            bindlxFirstNav: 20,
            catchlxSecondNav: 21,
            bindlxSecondNav: 21,
            catchgoToProductDetail: 22,
            bindgoToProductDetail: 22,
            catchgoToMoreProducts: 23,
            bindgoToMoreProducts: 23
        } ] ],
        "wx-promotion-pop": [ "n23", [ {
            promotionData: 8,
            isSupportMiniPro: 9
        }, {
            catchnoscroll: 10,
            bindnoscroll: 10,
            catchclose: 12,
            bindclose: 12
        } ] ],
        "wx-quick-nav": [ "n24", [ {
            launchAppUrl: 8,
            shopOptions: 9,
            scene: 10,
            lxData: 11,
            showMore: 12,
            position: 13
        }, {
            catchlaunchtap: 14,
            bindlaunchtap: 14,
            catchclose: 15,
            bindclose: 15
        } ] ],
        "wx-rainbow": [ "n25", [ {
            loadOptions: 8,
            rainBowData: 9
        }, {} ] ],
        "wx-report-formid": [ "n26", [ {
            bizType: 8,
            zIndex: 9,
            categoryId: 10
        }, {} ] ],
        "wx-review-dish": [ "n27", [ {
            reviewDish: 8,
            lxData: 9,
            shopId: 10,
            shopUuid: 11
        }, {} ] ],
        "wx-review-list": [ "n28", [ {
            reviewListParams: 8,
            lxData: 9,
            needLogin: 10,
            canLaunchApp: 11,
            tagConfig: 12,
            hasApp: 13
        }, {
            catchrevieweventlisten: 16,
            bindrevieweventlisten: 16,
            catchhorizontalscroll: 17,
            bindhorizontalscroll: 17,
            catchlazyload: 18,
            bindlazyload: 18,
            catchlaunchtap: 19,
            bindlaunchtap: 19
        } ] ],
        "wx-rich-card": [ "n29", [ {
            config: 8,
            carditem: 9,
            cardidx: 10,
            pageType: 11,
            cityId: 12,
            isNearby: 13
        }, {
            catchfollowuser: 14,
            bindfollowuser: 14,
            catchcardpreview: 15,
            bindcardpreview: 15
        } ] ],
        "wx-search-entry": [ "n30", [ {
            keyword: 8
        }, {
            catchsearchshow: 9,
            bindsearchshow: 9
        } ] ],
        "wx-seed-icon": [ "n31", [ {
            name: 8,
            type: 9,
            size: 10,
            selected: 11
        }, {} ] ],
        "wx-seed-related-content": [ "n32", [ {
            viewType: 8,
            content: 9,
            canLaunchApp: 10
        }, {
            catchtapConent: 11,
            bindtapConent: 11,
            catchtapPicture: 12,
            bindtapPicture: 12,
            catchtapButton: 13,
            bindtapButton: 13,
            catchtapAdditional: 14,
            bindtapAdditional: 14,
            catchtapCurrentBar: 15,
            bindtapCurrentBar: 15,
            catchlaunchtap: 16,
            bindlaunchtap: 16
        } ] ],
        "wx-seed-star": [ "n33", [ {
            star: 8,
            score: 9,
            classname: 10,
            starStyle: 11,
            textStyle: 12,
            canClick: 13
        }, {
            catchtapStar: 14,
            bindtapStar: 14
        } ] ],
        "wx-seed-tag": [ "n34", [ {
            type: 8,
            value: 9,
            size: 10
        }, {} ] ],
        "wx-shop-card": [ "n35", [ {
            card: 8,
            active: 9,
            needbottom: 10,
            needborderbottom: 11
        }, {
            catchmygrouptap: 12,
            bindmygrouptap: 12,
            catchmidascb: 13,
            bindmidascb: 13
        } ] ],
        "wx-shop-review-tag": [ "n36", [ {
            pageName: 8,
            reviewTags: 9,
            reviewCount: 10,
            launchAppUrl: 11,
            hitTag: 12,
            moduleConfig: 13,
            lxData: 14,
            isAndroid: 15,
            isList: 16,
            shopOptions: 17,
            needLogin: 18,
            canLaunchApp: 19,
            showRightArrow: 20
        }, {
            catchreviewTagAction: 21,
            bindreviewTagAction: 21,
            catchclickAllReview: 22,
            bindclickAllReview: 22,
            catchallReviewTap: 23,
            bindallReviewTap: 23,
            catchlaunchtap: 24,
            bindlaunchtap: 24
        } ] ],
        "wx-shop-review": [ "n37", [ {
            reviewList: 8,
            config: 9,
            reviewBid: 10,
            lxData: 11,
            showReviewBottom: 12,
            shopId: 13,
            shopUuid: 14,
            pageName: 15,
            shopOptions: 16,
            lastReview: 17,
            needLogin: 18,
            canLaunchApp: 19,
            hasApp: 20
        }, {
            catchpreviewImage: 21,
            bindpreviewImage: 21,
            catchlaunchtap: 22,
            bindlaunchtap: 22
        } ] ],
        "wx-top-parent": [ "n38", [ {}, {} ] ],
        "wx-vote-bar": [ "n39", [ {
            shopOptions: 8,
            showAddBtn: 9,
            shopName: 10,
            shopIntro: 11,
            voteShopInfo: 12
        }, {
            catchaddToVote: 13,
            bindaddToVote: 13,
            catchhandleVoteList: 14,
            bindhandleVoteList: 14
        } ] ],
        "wx-waterfall-view": [ "n40", [ {
            styleConfig: 8,
            data: 9,
            loadHeight: 10,
            refresh: 11,
            loadMore: 12,
            isEnd: 13,
            pageError: 14
        }, {
            catchnextpage: 16,
            bindnextpage: 16
        } ] ],
        "wx-webview": [ "n41", [ {
            accountDomain: 8,
            initWebview: 9,
            openUrl: 10,
            tokenDomain: 11,
            appName: 12,
            appVersion: 13,
            tokenUrl: 14,
            lxsdkParams: 15
        }, {
            catchwebviewMsg: 18,
            bindwebviewMsg: 18
        } ] ],
        "wx-exception": [ "n42", [ {
            exceptionDetail: 8
        }, {
            catchexceptionevent: 9,
            bindexceptionevent: 9
        } ] ],
        "wx-login": [ "n43", [ {
            cx: 8,
            openid: 9,
            bgImage: 10,
            loginStep: 11,
            loginSourceType: 12,
            loginDomain: 13,
            needLogin: 14,
            loginType: 15,
            thirdUidInfo: 16,
            needMerge: 17,
            mergeFailover: 18
        }, {
            catchloginend: 19,
            bindloginend: 19,
            catchlogining: 22,
            bindlogining: 22
        } ] ],
        "wx-slider-1": [ "n44", [ {
            title: 8,
            imgTitle: 9,
            imgButton: 10
        }, {
            catchsliderEvent: 15,
            bindsliderEvent: 15
        } ] ],
        "wx-activity-banner-component": [ "n45", [ {
            shopOptions: 8
        }, {} ] ],
        "wx-coupon-bag": [ "n46", [ {
            shopOptions: 8,
            moduleConfig: 9,
            lxData: 10
        }, {} ] ],
        "wx-friends-come": [ "n47", [ {
            shopOptions: 8,
            moduleConfig: 9,
            lxData: 10
        }, {
            catchhorizontalscroll: 11,
            bindhorizontalscroll: 11,
            catchlazyload: 12,
            bindlazyload: 12
        } ] ],
        "wx-shop-comment": [ "n48", [ {
            shopOptions: 8,
            moduleConfig: 9,
            imData: 10,
            lxData: 11,
            isFavorite: 12,
            categoryId: 13,
            reviewCount: 14,
            shopName: 15,
            shopType: 16,
            branchName: 17,
            shopPic: 18,
            shopGeo: 19
        }, {
            catchhideMask: 20,
            bindhideMask: 20
        } ] ],
        "wx-shop-craftsman": [ "n49", [ {
            shopOptions: 8,
            moduleConfig: 9,
            lxData: 10
        }, {} ] ],
        "wx-shop-dinevote": [ "n50", [ {
            shopOptions: 8,
            moduleConfig: 9,
            scene: 10
        }, {} ] ],
        "wx-shop-dish": [ "n51", [ {
            hasApp: 8,
            dishData: 9,
            shopOptions: 10,
            moduleConfig: 11,
            canLaunchApp: 12,
            needLogin: 13,
            lxData: 14
        }, {
            catchhorizontalscroll: 15,
            bindhorizontalscroll: 15,
            catchlaunchtap: 16,
            bindlaunchtap: 16
        } ] ],
        "wx-shop-follow": [ "n52", [ {
            offuserid: 8,
            moduleConfig: 9,
            shopOptions: 10,
            lxData: 11
        }, {} ] ],
        "wx-shop-friendlike": [ "n53", [ {
            shopOptions: 8,
            moduleConfig: 9,
            lxData: 10
        }, {} ] ],
        "wx-shop-head": [ "n54", [ {
            shopHeadData: 8,
            shopOptions: 9,
            moduleConfig: 10,
            lxData: 11,
            needLogin: 12,
            canLaunchApp: 13,
            mapiError: 14,
            showAddToVoteBtn: 15
        }, {
            catchheadhide: 16,
            bindheadhide: 16,
            catchheadshow: 17,
            bindheadshow: 17,
            catchhandleReLoad: 18,
            bindhandleReLoad: 18,
            catchhorizontalscroll: 19,
            bindhorizontalscroll: 19,
            catchlaunchtap: 20,
            bindlaunchtap: 20,
            catchaddToVote: 21,
            bindaddToVote: 21
        } ] ],
        "wx-shop-info": [ "n55", [ {
            shopInfoData: 8,
            shopOptions: 9,
            moduleConfig: 10,
            lxData: 11
        }, {} ] ],
        "wx-shop-ktv-book": [ "n56", [ {
            bookData: 8,
            shopOptions: 9,
            moduleConfig: 10,
            lxData: 11
        }, {} ] ],
        "wx-shop-maiton": [ "n57", [ {
            shopOptions: 8,
            moduleConfig: 9,
            shopId: 10,
            cityId: 11,
            lxData: 12
        }, {} ] ],
        "wx-shop-map": [ "n58", [ {
            moduleConfig: 8,
            carData: 9,
            shopMapData: 10,
            shopOptions: 11,
            needLogin: 12,
            canLaunchPoi: 13,
            canLaunchApp: 14,
            lxData: 15,
            route: 16
        }, {
            catchlaunchtap: 17,
            bindlaunchtap: 17
        } ] ],
        "wx-shop-operate": [ "n59", [ {
            moduleConfig: 8,
            lxData: 9
        }, {
            catchpromptMask: 10,
            bindpromptMask: 10,
            catchhideMask: 11,
            bindhideMask: 11
        } ] ],
        "wx-shop-oversea-businesshours": [ "n60", [ {
            shopOptions: 8,
            moduleConfig: 9
        }, {
            catchpromptMask: 10,
            bindpromptMask: 10,
            catchhideMask: 11,
            bindhideMask: 11
        } ] ],
        "wx-shop-promo": [ "n61", [ {
            promoData: 8,
            moduleConfig: 9
        }, {} ] ],
        "wx-shop-quality": [ "n62", [ {
            moduleConfig: 8,
            shopOptions: 9,
            lxData: 10
        }, {} ] ],
        "wx-shop-rank": [ "n63", [ {
            shopOptions: 8,
            moduleConfig: 9,
            lxData: 10
        }, {
            catchsharetitle: 12,
            bindsharetitle: 12
        } ] ],
        "wx-shop-reserve": [ "n64", [ {
            shopOptions: 8,
            lxData: 9,
            moduleConfig: 10
        }, {
            catchhideMask: 11,
            bindhideMask: 11,
            catchpromptMask: 12,
            bindpromptMask: 12,
            catchreserveItemTap: 13,
            bindreserveItemTap: 13
        } ] ],
        "wx-shop-service": [ "n65", [ {
            shopOptions: 8,
            lxData: 9
        }, {} ] ],
        "wx-shop-slot": [ "n66", [ {
            slotItems: 8
        }, {} ] ],
        "wx-shop-times-card": [ "n67", [ {
            shopOptions: 8
        }, {} ] ],
        "wx-shop-tuan": [ "n68", [ {
            shopOptions: 8,
            lxData: 9,
            moduleConfig: 10,
            isFromApp: 11
        }, {} ] ],
        "wx-shop-widely-order": [ "n69", [ {
            shopOptions: 8,
            moduleConfig: 9
        }, {} ] ],
        "wx-category": [ "n70", [ {
            options: 8,
            isFirstLoad: 9,
            initFinishTime: 10
        }, {
            catchchangecatestate: 11,
            bindchangecatestate: 11,
            catchcatefail: 13,
            bindcatefail: 13,
            catchnoscroll: 14,
            bindnoscroll: 14,
            catchclose: 15,
            bindclose: 15
        } ] ],
        "wx-group": [ "n71", [ {
            options: 8,
            isFirstLoad: 9,
            initFinishTime: 10
        }, {} ] ],
        "wx-guess-like": [ "n72", [ {
            options: 8,
            lastCity: 9,
            isFirstLoad: 10,
            initFinishTime: 11,
            reachBottom: 12
        }, {
            catchlistexceptionreload: 13,
            bindlistexceptionreload: 13
        } ] ],
        "wx-index-activity": [ "n73", [ {
            options: 8,
            isFirstLoad: 9,
            initFinishTime: 10,
            isSupportMiniPro: 11
        }, {} ] ],
        "wx-index-ad": [ "n74", [ {
            promoResources: 8,
            isSupportMiniPro: 9,
            options: 10
        }, {} ] ],
        "wx-index-groupseckill": [ "n75", [ {
            options: 8,
            isFirstLoad: 9,
            initFinishTime: 10
        }, {} ] ],
        "wx-pop-up": [ "n76", [ {
            options: 8,
            hasTip: 9,
            isSupportMiniPro: 10
        }, {
            catchnoscroll: 11,
            bindnoscroll: 11,
            catchclose: 12,
            bindclose: 12
        } ] ],
        "wx-choosenList": [ "n77", [ {
            goodRankList: 8
        }, {} ] ],
        "wx-foodList": [ "n78", [ {
            item: 8,
            foodRankList: 9
        }, {} ] ],
        "wx-shopCard": [ "n79", [ {
            item: 8,
            categoryId: 9
        }, {} ] ],
        "wx-shopItem": [ "n80", [ {
            item: 8,
            categoryId: 9,
            hasBrandShop: 10,
            parentShop: 11,
            lastChildShop: 12,
            spreadParentShop: 13
        }, {} ] ],
        "wx-body": [ "r" ],
        "wx-dynamic": [ "a1" ],
        "wx-view": [ "a2" ],
        "wx-slot": [ "a3" ],
        "wx-block": [ "bk" ],
        s: [ "s" ],
        b: [ "b" ]
    },
    evs: {
        catchtouchstart: 1,
        bindtouchstart: 1,
        catchtouchmove: 2,
        bindtouchmove: 2,
        catchtouchcancel: 3,
        bindtouchcancel: 3,
        catchtouchend: 4,
        bindtouchend: 4,
        catchtap: 5,
        bindtap: 5,
        catchlongpress: 6,
        bindlongpress: 6,
        catchlongtap: 7,
        bindlongtap: 7
    }
};