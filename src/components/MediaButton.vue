<template>
  <div class="btn-holder">
    <a
      :class="action"
      href="#"
      class="btn"
      @click="btnClickHandler" />
  </div>
</template>

<script>
import constants from '../config/constants'

export default {
    props: {
        name: {
            type: String,
            required: true
        }
    },
    data () {
        return {
            action: constants.REC,
            timer: 0
        }
    },
    methods: {
        btnClickHandler () {
            switch (this.action) {
            case constants.REC:
                this.action = constants.STOP
                this.$emit(constants.REC)
                break
            case constants.STOP:
                this.action = constants.REC
                this.$emit(constants.STOP)
                break
            default:
                this.action = constants.REC
            }
        }
    }
}
</script>

<style lang="scss" scoped>
	$btn-size: 100px;
	$rec-fs: $btn-size/1.5;
	$stop-fs: $btn-size/2.14;
	.btn-holder {
		margin: 0 auto;
		.btn {
			width: $btn-size;
			height: $btn-size;
			position: relative;
			border-radius: 50%;
			float:left;
			text-decoration: none;

			&:after {
				color:#e9e6e4;
				content: "";
				display: block;
				height: 50px;
				text-decoration: none;
				text-shadow: 0px -1px 1px #bdb5b4, 1px 1px 1px white;
				position: absolute;
				width: 50px;
			}

			&.rec, &.stop {
				font-size: $rec-fs;
				background-image: -webkit-linear-gradient(top, #f50000, #b30a0a);
				background-image: linear-gradient(top, #f50000, #b30a0a);
				box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .3),
					inset 0px 4px 1px 1px #ff0d0d,
					inset 0px -3px 1px 1px rgba(204,198,197,.5);

				&:after {
					content: "●";
					left: 31%;
					top: 4%;
					color: white;
				}

				&:hover {
					background-image: -webkit-linear-gradient(top, #ff0d0d, #ce0404);
					background-image: linear-gradient(top, #ff0d0d, #ce0404);
					color:#0088cc;
				}

				&:active {
					background-image: -webkit-linear-gradient(top, #b30a0a, #b30a0a);
					background-image: linear-gradient(top, #b30a0a, #b30a0a);
					box-shadow: 0 3px 5px 0 rgba(0,0,0,.4), inset 0px -3px 1px 1px rgba(204,198,197,.5);
				}
			}

			&.stop {
				font-size: $stop-fs;
				&:after {
					content: "◼";
					left: 27%;
					top: 22%;
					color: white;
				}
			}

			&.play {
				background-image: -webkit-linear-gradient(top, #21d400, #148000);
				background-image: linear-gradient(top, #21d400, #148000);
				box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .3),
					inset 0px 4px 1px 1px #21d400,
					inset 0px -3px 1px 1px rgba(204,198,197,.5);

				&:after {
					content: "▶";
					left: 38%;
					top: 27%;
					color: white;
					font-size: 50px;
				}

				&:hover {
					background-image: -webkit-linear-gradient(top, #21d400, #179400);
					background-image: linear-gradient(top, #21d400, #179400);
					color:#0088cc;
				}

				&:active {
					background-image: -webkit-linear-gradient(top, #148000, #148000);
					background-image: linear-gradient(top, #148000, #148000);
					box-shadow: 0 3px 5px 0 rgba(0,0,0,.4), inset 0px -3px 1px 1px rgba(204,198,197,.5);
				}
			}

			&.pause {
				background-image: -webkit-linear-gradient(top, #ff9800, #bd7100);
				background-image: linear-gradient(top, #ff9800, #bd7100);
				box-shadow: 0px 8px 10px 0px rgba(0, 0, 0, .3),
					inset 0px 4px 1px 1px #fd9c0b,
					inset 0px -3px 1px 1px rgba(204,198,197,.5);

				&:after {
					content: '▐▐';
					left: 34%;
					top: 33%;
					color: white;
					font-size: 30px;
				}

				&:hover {
					background-image: -webkit-linear-gradient(top, #ff9800, #e88b00);
					background-image: linear-gradient(top, #ff9800, #e88b00);
				}

				&:active {
					background-image: -webkit-linear-gradient(top, #bd7100, #bd7100);
					background-image: linear-gradient(top, #bd7100, #bd7100);
					box-shadow: 0 3px 5px 0 rgba(0,0,0,.4), inset 0px -3px 1px 1px rgba(204,198,197,.5);
				}
			}
		}
	}
</style>
