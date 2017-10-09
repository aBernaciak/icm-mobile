<template>
  <div class="page has-navbar" v-nav="{
  		title: 'About',
  		showBackButton: true,
      showMenuButton: true,
      onMenuButtonClick: showActionSheet
  	}">
    <div class="page-content text-center" v-if="meteoImg.src">
  	 	<!-- <input type="text" placeholder="placeholder" ref="input" value="warszawa" @keyup.enter="submit($event)"> -->
<!--   	 	<div class="button-container">
	  	 	<button class="button button-positive" @click="showActionSheet('weixin')">Opcje</button>
  		 	<button class="button button-positive" v-for="property in meteoImg.properties"
				@click="showMeteoPart(property.propertyName)">{{property.name}}</button>
  	 	</div> -->
  	 	<div class="legend-container" :style="getUrlMeteo()"></div>
  	 	<div class="meteo-container" :style="getUrlMeteo()" :class="meteoImg.partShown">
  	 		<img :src="meteoImg.src" alt="" class="hidden">
  	 	</div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      savedImg: '',
      cityAdress: '',
      refreshed: false,
      meteoImg: {
      	partShown: null,
      	shown: false,
      	date: '',
      	src: null,
      	year: this.$moment().format("YYYY"),
      	month: this.$moment().format("MM"),
      	day: this.$moment().format("DD"),
      	hour: this.$moment().format("H"),
      	lat: null,
      	lng: null,
      	properties:[{ 
      		name: 'temperatura',
      		propertyName: 'temperature'
    	 	},
    	 	{ 
    	 		name: 'opady',
    	 		propertyName: 'rain'
  	 	 	},
    	 	{ 
    	 		name: 'ciśnienie',
    	 		propertyName: 'pressure'
  	 	 	},
    	 	{ 
    	 		name: 'wiatr',
    	 		propertyName: 'wind'
  	 	 	},
    	 	{ 
    	 		name: 'widoczność',
    	 		propertyName: 'visibility'
  	 	 	},
    	 	{ 
    	 		name: 'zachmurzenie',
    	 		propertyName: 'cloudiness'
  	 	 	}]
      }
    }
  },
  methods: {
  	showActionSheet(theme) {
      $actionSheet.show({
        theme: theme || 'weixin',
        title: 'Opcje',
        cancelText: 'Anuluj',
        buttons: {
          'Odśwież': () => {
          	this.getActualMeteo()
          },
          'Temperatura': () => {
          	this.showMeteoPart('temperature');
          },
          'Opady': () => {
          	this.showMeteoPart('rain');
          },
          'Ciśnienie': () => {
          	this.showMeteoPart('pressure');
          },
          'Wiatr': () => {
          	this.showMeteoPart('wind');
          },
          'Widoczność': () => {
          	this.showMeteoPart('visibility');
          },
          'Zachmurzenie': () => {
          	this.showMeteoPart('cloudiness');
          },
        }
      })
    },
  	showMeteoPart(part) {
  		this.meteoImg.partShown = part;
  	},
  	getUrlMeteo() {
  		if(this.meteoImg.src !== null)
  		return { 'background-image': 'url("' + this.meteoImg.src + '")' }
  	},
    getActualMeteo(){
			this.meteoImg.src = 	
				`https://www.meteo.pl/um/metco/mgram_pict.php?ntype=0u&fdate=${this.meteoImg.year}${this.meteoImg.month}${this.meteoImg.day}${this.meteoImg.hour}&row=409&col=255&lang=pl`;
  		this.meteoImg.partShown = null;
    },
    setMeteoHour() {
			let meteoUpdatedInterval = 6;
			let hourModulo = (this.meteoImg.hour % meteoUpdatedInterval) + meteoUpdatedInterval;
			if(hourModulo >= 0) {
				this.meteoImg.hour -= (hourModulo + meteoUpdatedInterval);
				if (this.meteoImg.hour < 0) {
					this.meteoImg.day = this.$moment().subtract(1, "days").format("DD");
					this.meteoImg.hour = 18;
				}
				if (this.meteoImg.hour.toString().length == 1) {
					this.meteoImg.hour = '0' + this.meteoImg.hour;
				}
			}
    },
  	submit(event) {
  		this.$http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${event.target.value}`)
      .then(function(response){
      	var results = response.body.results[0];
      	this.meteoImg.lng = results.geometry.location.lng;
      	this.meteoImg.lat = results.geometry.location.lat;
      	console.log(this.meteoImg.lat, this.meteoImg.lng)
    }, (response) => {
    })
  	}
  },
	created() {
		this.setMeteoHour();
		this.getActualMeteo();
		if (this.meteoImg.src !== null) {
			this.getUrlMeteo();
			this.meteoImg.shown = true;
		}
	}
}
</script>
<style lang="scss">
	.hidden {
		visibility: hidden;
		opacity: 0;
	}
	.meteo-container, .legend-container {
		background-repeat: no-repeat;
    width: 100%;
    overflow: hidden;
    transition: all ease-in 0.6s;
    display: inline-block;
	}
	.legend-container {
		background-position: 50% 0;
		height: 60px;
	}
	.meteo-container {
    height: 100%;
    background-position: 50% -55px;
    &.temperature {
    	height: 90px;
    }
    &.rain {
    	height: 100px;
    	background-position-y: -135px;
    }
    &.pressure {
    	height: 100px;
    	background-position-y: -220px;
    }
    &.wind {
    	height: 140px;
    	background-position-y: -305px;
    }
    &.visibility {
    	height: 100px;
    	background-position-y: -430px;
    }
    &.cloudiness {
    	height: 100px;
    	background-position-y: -520px;
    }
	}
	.button-container {
		margin-bottom: 20px;
		.button {
			margin-left: 10px;
		}
	}
</style>