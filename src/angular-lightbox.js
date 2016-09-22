(function(){
  'use strict';

  angular.module('angular-lightbox')
    .constant('angularLightboxConfig', {
      modalTemplate: '<div style="display:none" class="rg-lightbox-modal">\n  <span class="rg-lightbox-modal-close">×</span>\n  <h3 class="rg-lightbox-modal-loading">Loading Image. <small>Please Wait.</small></h3>\n  <img class="rg-lightbox-modal-content">\n  <div class="rg-lightbox-modal-caption"></div>\n</div>',
      imgTitle: 'Click to enlarge image'
    })

    .directive('lightbox', function (angularLightboxConfig) {
      var modalElTmpl = angularLightboxConfig.modalTemplate
      var element = angular.element;
      var imgTitle = angularLightboxConfig.imgTitle;
      var modalEl = null;
      var modalImgEl = null;
      var modalCaptionEl = null;
      var bodyOriginalOverflow = null;
      var headOriginalOverflow = null;
      var loadingOverflow = null;

      function setModalContent(src, caption) {
        var bodyEl = document.body;
        var headEl = document.head;

        modalEl.style.display = src ? 'block' : 'none';
        modalImgEl.src = src || '';
        modalCaptionEl.innerHTML = caption || '';

        if (src) {
          showLoading();
          bodyOriginalOverflow = bodyEl.style.overflow;
          headOriginalOverflow = headEl.style.overflow;
          bodyEl.style.overflow = 'hidden';
        } else {
          hideLoading();
          bodyEl.style.overflow = bodyOriginalOverflow;
          headEl.style.overflow = headOriginalOverflow;
        }
      }

      function hideLoading() {
        loadingOverflow.style.display = 'none';
      }

      function showLoading() {
        loadingOverflow.style.display = 'block';
      }

      function buildModal() {
        var closeBtnEl;

        if (!modalEl) {
          modalEl = element(modalElTmpl);
          element(document.body).append(modalEl);

          closeBtnEl = modalEl.find('span');
          modalImgEl = modalEl.find('img');
          modalCaptionEl = modalEl.find('div')[0];
          loadingOverflow = modalEl.find('h3')[0];

          modalImgEl.on('load', hideLoading);
          modalEl.on('click', function (e) {
            if (e.target && (e.target.tagName || '').toLowerCase() === 'div') {
              setModalContent();
            }
          });

          closeBtnEl.on('click', function () {
            setModalContent();
          });

          closeBtnEl = closeBtnEl[0];
          modalEl = modalEl[0];
          modalImgEl = modalImgEl[0];
        }

        return modalEl;
      }

      buildModal();

      return {
        scope: {
          lightbox: '@'
        },
        restrict: 'A',
        controllerAs: 'ctrl',
        bindToController: true,
        controller: function ($element) {
          var ctrl = this;
          $element[0].title = imgTitle;
          $element.on('click', function () {
            setModalContent(ctrl.lightbox || this.src, this.alt);
          });
        }
      };
    });
})();