<template>
	<div>
		<div class="pl-2 pr-2">
			<b-jumbotron
				header="Rekomendasi"
				lead="Pilihlah atribut yang sesuai dengan kriteria anda "
			>
				<hr />
				<p>
					Sistem rekomendasi instrumen investasi menggunakan algoritma
					collaborative-filtering
				</p>
				<router-link to="/"
					><b-button variant="outline-success"
						>Buka Aplikasi</b-button
					></router-link
				>
			</b-jumbotron>
		</div>
	</div>
</template>
<script>
	export default{
		data(){
			return{

			}
		},
		methods:{

		},
		created(){
			this.$parent.refreshChildIndex();
		},
		destroyed(){
			this.$parent.refreshChildIndex();
		}
	}
</script>
<style>
	
</style>