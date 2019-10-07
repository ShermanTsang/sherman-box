<style lang="scss">
  .tip {
    margin: 0 auto;
    background-color: #fff;
    padding: 32px;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    transition: all .2s ease-in-out;

    &__svg {
      width: 220px;
      height: 220px;

      &__stack-illustration {
        display: block;
        position: relative;
        top: 50%;
        height: 50%;
        min-height: 200px;
        margin: 0 auto;
        transform: translateY(-50%) translateZ(0);

        svg:not(:root) {
          overflow: visible;
        }
      }

      &__stack-illustration__item {
        position: relative;

        &--one {
          transform: rotate(-20deg) translate(-3px, 80px) translateZ(0);

          &.animated {
            animation: popupLeft 0.75s cubic-bezier(0.215, 0.61, 0.355, 1) forwards 1;

            &.secondary {
              animation: hoverLeft 3s linear forwards infinite;
            }
          }
        }

        &--two {
          transform: translate(52px, 54px) translateZ(0);

          &.animated {
            animation: popupCenter 0.75s 0.4s cubic-bezier(0.215, 0.61, 0.355, 1) forwards 1;

            &.secondary {
              animation: hoverCenter 3s linear forwards infinite;
            }
          }
        }

        &--three {
          transform: rotate(20deg) translate(100px, 34px) translateZ(0);

          &.animated {
            animation: popupRight 0.75s 0.8s cubic-bezier(0.215, 0.61, 0.355, 1) forwards 1;

            &.secondary {
              animation: hoverRight 3s linear forwards infinite;
            }
          }
        }
      }

      @keyframes popupLeft {
        0% {
          transform: rotate(-20deg) translate(-3px, 80px) translateZ(0);
        }
        60% {
          transform: rotate(-20deg) translate(-3px, 17px) translateZ(0);
        }
        80% {
          transform: rotate(-20deg) translate(-3px, 20px) translateZ(0);
        }
        100% {
          transform: rotate(-20deg) translate(-3px, 19px) translateZ(0);
        }
      }

      @keyframes popupCenter {
        0% {
          transform: translate(52px, 54px) translateZ(0);
        }
        60% {
          transform: translate(52px, -2px) translateZ(0);
        }
        80% {
          transform: translate(52px, 1px) translateZ(0);
        }
        100% {
          transform: translate(52px, 0px) translateZ(0);
        }
      }

      @keyframes popupRight {
        0% {
          transform: rotate(20deg) translate(100px, 34px) translateZ(0);
        }
        60% {
          transform: rotate(20deg) translate(100px, -30px) translateZ(0);
        }
        80% {
          transform: rotate(20deg) translate(100px, -27px) translateZ(0);
        }
        100% {
          transform: rotate(20deg) translate(100px, -28px) translateZ(0);
        }
      }

      @keyframes hoverLeft {
        0% {
          transform: rotate(-20deg) translate(-3px, 19px) translateZ(0);
        }
        50% {
          transform: rotate(-20deg) translate(-3px, 21px) translateZ(0);
        }
        100% {
          transform: rotate(-20deg) translate(-3px, 19px) translateZ(0);
        }
      }

      @keyframes hoverCenter {
        0% {
          transform: translate(52px, 0px) translateZ(0);
        }
        40% {
          transform: translate(52px, 2px) translateZ(0);
        }
        100% {
          transform: translate(52px, 0px) translateZ(0);
        }
      }

      @keyframes hoverRight {
        0% {
          transform: rotate(20deg) translate(100px, -28px) translateZ(0);
        }
        60% {
          transform: rotate(20deg) translate(100px, -26px) translateZ(0);
        }
        100% {
          transform: rotate(20deg) translate(100px, -28px) translateZ(0);
        }
      }
    }

    &__text {
      color: #999;
      letter-spacing: 1px;
      text-align: center;
      margin-top: 20px;
    }

  }
</style>

<template>
  <div class="tip">
    <div class="tip__svg">
      <svg viewBox="0 0 136 135" class="tip__svg__stack-illustration">
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g transform="translate(-855.000000, -240.000000)">
            <g transform="translate(855.000000, 240.000000)">
              <ellipse fill="#D4E6F3" cx="68" cy="133" rx="44" ry="2" />
              <g
                class="tip__svg__stack-illustration__item animated tip__svg__stack-illustration__item--one"
                transform="translate(19.139324, 27.378808) rotate(-20.000000) translate(-19.139324, -27.378808) translate(3.139324, 15.378808)"
              >
                <rect
                  fill="#F2F9FE"
                  x="4.21884749e-14"
                  y="-3.92574862e-13"
                  width="32"
                  height="24"
                  rx="2"
                />
                <path
                  d="M2,2 L2,22 L30,22 L30,2 L2,2 Z M2,0 L30,0 C31.1045695,-2.02906125e-16 32,0.8954305 32,2 L32,22 C32,23.1045695 31.1045695,24 30,24 L2,24 C0.8954305,24 1.3527075e-16,23.1045695 0,22 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z"
                  fill="#B5D3E8"
                  fill-rule="nonzero"
                />
                <path
                  d="M16.4329136,17.402551 L25.896893,8.18614168 C26.2925582,7.80082682 26.3009487,7.16771744 25.9156339,6.77205229 C25.530319,6.37638715 24.8972096,6.36799659 24.5015445,6.75331145 L16.5690396,14.4783084 L13.2318719,10.5611413 L7.88684625,15.1840816 C7.46912674,15.5453694 7.42337977,16.1768795 7.78466754,16.5945991 C8.14595531,17.0123186 8.77746549,17.0580655 9.195185,16.6967778 L13.016175,13.3919837 L16.4329136,17.402551 Z"
                  fill="#B5D3E8"
                  fill-rule="nonzero"
                />
              </g>
              <g
                class="tip__svg__stack-illustration__item animated tip__svg__stack-illustration__item--two"
                transform="translate(52.000000, 0.000000)"
              >
                <g>
                  <rect
                    fill="#F2F9FE"
                    x="0"
                    y="0"
                    width="32"
                    height="24"
                    rx="2"
                  />
                  <path
                    d="M2,2 L2,22 L30,22 L30,2 L2,2 Z M2,0 L30,0 C31.1045695,-2.02906125e-16 32,0.8954305 32,2 L32,22 C32,23.1045695 31.1045695,24 30,24 L2,24 C0.8954305,24 1.3527075e-16,23.1045695 0,22 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z"
                    fill="#B5D3E8"
                    fill-rule="nonzero"
                  />
                </g>
                <rect
                  fill="#B5D3E8"
                  x="5"
                  y="5"
                  width="22"
                  height="2"
                  rx="1"
                />
                <rect
                  fill="#B5D3E8"
                  x="5"
                  y="8"
                  width="22"
                  height="2"
                  rx="1"
                />
                <rect
                  fill="#B5D3E8"
                  x="13"
                  y="11"
                  width="14"
                  height="2"
                  rx="1"
                />
                <rect
                  fill="#B5D3E8"
                  x="13"
                  y="14"
                  width="6"
                  height="2"
                  rx="1"
                />
                <rect
                  fill="#B5D3E8"
                  x="13"
                  y="17"
                  width="2"
                  height="2"
                  rx="1"
                />
              </g>
              <g
                class="tip__svg__stack-illustration__item animated tip__svg__stack-illustration__item--three"
                transform="translate(117.000000, 27.000000) rotate(20.000000) translate(-117.000000, -27.000000) translate(101.000000, 15.000000)"
              >
                <g>
                  <g>
                    <rect
                      fill="#F2F9FE"
                      x="-6.16173779e-14"
                      y="2.64677169e-13"
                      width="32"
                      height="24"
                      rx="2"
                    />
                    <path
                      d="M2,2 L2,22 L30,22 L30,2 L2,2 Z M2,0 L30,0 C31.1045695,-2.02906125e-16 32,0.8954305 32,2 L32,22 C32,23.1045695 31.1045695,24 30,24 L2,24 C0.8954305,24 1.3527075e-16,23.1045695 0,22 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z"
                      fill="#B5D3E8"
                      fill-rule="nonzero"
                    />
                  </g>
                </g>
                <path
                  d="M11.5769654,11.8647293 C12.1197402,11.2392018 12.934612,10.3121642 14.0208267,9.08449766 C14.3867943,8.67087205 14.3481599,8.03888687 13.9345343,7.67291924 C13.5209087,7.30695162 12.8889235,7.34558605 12.5229559,7.75921165 C8.18860378,12.6580029 9.04315995,11.6731591 9.00412,12.1019053 C9.11601675,12.7233704 9.11601675,12.7233704 9.1803365,12.7715934 C9.22620774,12.8371408 9.22620774,12.8371408 9.26411787,12.8857128 C9.30881804,12.9424285 9.36813662,13.0132846 9.44495829,13.1022202 C9.5869702,13.2666257 9.79587289,13.500826 10.073464,13.806977 C10.622137,14.4120999 11.4438134,15.303394 12.5394937,16.4819818 C12.9155318,16.8864738 13.5482765,16.9095402 13.9527685,16.5335021 C14.3572605,16.157464 14.380327,15.5247194 14.0042889,15.1202273 C12.9137848,13.9472074 12.0970538,13.0612778 11.5550964,12.4635613 C11.4625048,12.3614435 11.3780772,12.2678951 11.3018882,12.1830055 C11.3839218,12.0876267 11.4756383,11.981505 11.5769654,11.8647293 Z"
                  fill="#B5D3E8"
                  fill-rule="nonzero"
                />
                <path
                  d="M19.5769654,11.8647293 C20.1197402,11.2392018 20.934612,10.3121642 22.0208267,9.08449766 C22.3867943,8.67087205 22.3481599,8.03888687 21.9345343,7.67291924 C21.5209087,7.30695162 20.8889235,7.34558605 20.5229559,7.75921165 C16.1886038,12.6580029 17.04316,11.6731591 17.00412,12.1019053 C17.1160168,12.7233704 17.1160168,12.7233704 17.1803365,12.7715934 C17.2262077,12.8371408 17.2262077,12.8371408 17.2641179,12.8857128 C17.308818,12.9424285 17.3681366,13.0132846 17.4449583,13.1022202 C17.5869702,13.2666257 17.7958729,13.500826 18.073464,13.806977 C18.622137,14.4120999 19.4438134,15.303394 20.5394937,16.4819818 C20.9155318,16.8864738 21.5482765,16.9095402 21.9527685,16.5335021 C22.3572605,16.157464 22.380327,15.5247194 22.0042889,15.1202273 C20.9137848,13.9472074 20.0970538,13.0612778 19.5550964,12.4635613 C19.4625048,12.3614435 19.3780772,12.2678951 19.3018882,12.1830055 C19.3839218,12.0876267 19.4756383,11.981505 19.5769654,11.8647293 Z"
                  fill="#B5D3E8"
                  fill-rule="nonzero"
                  transform="translate(19.615969, 12.111476) scale(-1, 1) translate(-19.615969, -12.111476) "
                />
              </g>
              <g transform="translate(0.000000, 72.000000)">
                <rect
                  fill="#F2F9FE"
                  x="0"
                  y="0"
                  width="88"
                  height="16"
                  rx="2"
                />
                <path
                  d="M2,2 L2,14 L86,14 L86,2 L2,2 Z M2,0 L86,0 C87.1045695,-2.02906125e-16 88,0.8954305 88,2 L88,14 C88,15.1045695 87.1045695,16 86,16 L2,16 C0.8954305,16 1.3527075e-16,15.1045695 0,14 L0,2 C-1.3527075e-16,0.8954305 0.8954305,2.02906125e-16 2,0 Z"
                  fill="#B5D3E8"
                  fill-rule="nonzero"
                />
                <rect
                  fill="#F2F9FE"
                  x="0"
                  y="18"
                  width="88"
                  height="16"
                  rx="2"
                />
                <path
                  d="M2,20 L2,32 L86,32 L86,20 L2,20 Z M2,18 L86,18 C87.1045695,18 88,18.8954305 88,20 L88,32 C88,33.1045695 87.1045695,34 86,34 L2,34 C0.8954305,34 1.3527075e-16,33.1045695 0,32 L0,20 C-1.3527075e-16,18.8954305 0.8954305,18 2,18 Z"
                  fill="#B5D3E8"
                  fill-rule="nonzero"
                />
                <rect fill="#D6E8F4" x="20" y="2" width="4" height="12" />
                <rect fill="#D6E8F4" x="20" y="20" width="4" height="12" />
                <circle fill="#B5D3E8" cx="10" cy="8" r="1" />
                <circle fill="#B5D3E8" cx="6" cy="8" r="1" />
                <circle fill="#B5D3E8" cx="10" cy="26" r="1" />
                <circle fill="#B5D3E8" cx="6" cy="26" r="1" />
              </g>
              <g transform="translate(24.000000, 51.000000)">
                <rect
                  fill="#FFFFFF"
                  x="0"
                  y="0"
                  width="88"
                  height="65"
                  rx="4"
                />
                <path
                  d="M4,2 C2.8954305,2 2,2.8954305 2,4 L2,61 C2,62.1045695 2.8954305,63 4,63 L84,63 C85.1045695,63 86,62.1045695 86,61 L86,4 C86,2.8954305 85.1045695,2 84,2 L4,2 Z M4,0 L84,0 C86.209139,-4.05812251e-16 88,1.790861 88,4 L88,61 C88,63.209139 86.209139,65 84,65 L4,65 C1.790861,65 2.705415e-16,63.209139 0,61 L0,4 C-2.705415e-16,1.790861 1.790861,4.05812251e-16 4,0 Z"
                  fill="#B5D3E8"
                  fill-rule="nonzero"
                />
                <path
                  d="M23,31 C20.790861,31 19,29.209139 19,27 C19,24.790861 20.790861,23 23,23 C25.209139,23 27,24.790861 27,27 C27,29.209139 25.209139,31 23,31 Z M23,29 C24.1045695,29 25,28.1045695 25,27 C25,25.8954305 24.1045695,25 23,25 C21.8954305,25 21,25.8954305 21,27 C21,28.1045695 21.8954305,29 23,29 Z"
                  fill="#B5D3E8"
                  fill-rule="nonzero"
                />
                <path
                  d="M63,31 C60.790861,31 59,29.209139 59,27 C59,24.790861 60.790861,23 63,23 C65.209139,23 67,24.790861 67,27 C67,29.209139 65.209139,31 63,31 Z M63,29 C64.1045695,29 65,28.1045695 65,27 C65,25.8954305 64.1045695,25 63,25 C61.8954305,25 61,25.8954305 61,27 C61,28.1045695 61.8954305,29 63,29 Z"
                  fill="#B5D3E8"
                  fill-rule="nonzero"
                />
                <path
                  d="M31.4669854,46.846106 C35.5736043,49.4331199 39.7347395,50.7353516 43.9358973,50.7353516 C48.1344915,50.7353516 52.3350385,49.4347559 56.5248658,46.851185 C56.9949623,46.5613097 57.1410604,45.9452308 56.851185,45.4751342 C56.5613097,45.0050377 55.9452308,44.8589396 55.4751342,45.148815 C51.5880382,47.5457128 47.74585,48.7353516 43.9358973,48.7353516 C40.128508,48.7353516 36.3323784,47.5473488 32.5330146,45.153894 C32.0657232,44.8595181 31.4482698,44.9996939 31.153894,45.4669854 C30.8595181,45.9342768 30.9996939,46.5517302 31.4669854,46.846106 Z"
                  fill="#B5D3E8"
                  fill-rule="nonzero"
                />
                <rect fill="#B5D3E8" x="2" y="8" width="84" height="2" />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
    <div class="tip__text">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tip',
  props: {
    type: {
      type: String,
      default: 'empty'
    }
  },
  computed: {}
}
</script>
