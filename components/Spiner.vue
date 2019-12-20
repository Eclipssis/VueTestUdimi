<template>
	<div class="loader"></div>
</template>

<script>
	export default {
		name: 'Spiner'
	}
</script>

<style lang="scss" scoped>

$spinerSize: 21px;
$spinerThin: 3px;
$spinerColor: rgba(255, 255, 255, 0.2);

.loader,
.loader:after {
  border-radius: 50%;
  width: $spinerSize;
  height: $spinerSize;
}
.loader {
  margin: 0 auto;
  font-size: 10px;
  position: relative;
  text-indent: -9999em;
  border-top: $spinerThin solid $spinerColor;
  border-right: $spinerThin solid $spinerColor;
  border-bottom: $spinerThin solid $spinerColor;
  border-left: $spinerThin solid #ffffff;
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-animation: load8 1.1s infinite linear;
  animation: load8 1.1s infinite linear;
}
@-webkit-keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
@keyframes load8 {
  0% {
    -webkit-transform: rotate(0deg);
    transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

</style>