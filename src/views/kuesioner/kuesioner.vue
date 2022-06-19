<template>
	<div>
		<div class="pl-2 pr-2">
			<b-jumbotron
				header="Kuesioner"
				lead="Data investor mengenai instrumen investasi yang dipilih"
			>
				<p>
					Sistem rekomendasi instrumen investasi menggunakan algoritma
					collaborative-filtering
				</p>
				<b-button variant="primary" href="#">Buka Aplikasi</b-button>
			</b-jumbotron>
		</div>
		<!-- PAGE 1 -->
		<b-form-group class="m-2 ml-4 form-kuesioner">
			<div
				v-for="(item, name, index) in formHalving(alternatif)"
				class="mb-3"
			>
				<hr />
				<div class="mb-2">
					<b-badge variant="info" class="p-2 label">
						<b-icon
							icon="question-diamond"
							variant="light"
							class="mr-1"
						>
						</b-icon>
						{{ item.label }}</b-badge
					>
				</div>

				<b-form-radio-group
					:options="item.opsi"
					v-model="selected[name]"
					@change="print(index)"
				>
				</b-form-radio-group>
			</div>
			<b-button block v-if="page<3" variant="primary" class="mb-2" @click="page++">
				Berikutnya
			</b-button>
			<b-button block v-else variant="primary" class="mb-2" @click="sendDataPost()">
				Simpan Data
			</b-button>
		</b-form-group>
	</div>
</template>
<script>
export default {
	data() {
		return {
			page: 1,
			selected: {
				nama: null,
				umur: null,
				status_pekerjaan: null,
				sumber_dana: null,
				penghasilan: null,
				tujuan_investasi: null,
				tingkat_resiko: null,
				jangka_waktu: null,
				instrumen_investasi: null,
			},
			alternatif: {
				umur: {
					label: "Pilih kategori yang sesuai umur anda sekarang",
					opsi: [
						"18 tahun - 24 tahun",
						"25 tahun - 31 tahun",
						"32 tahun - 38 tahun",
						"39 tahun - 52 tahun",
						"Di atas 52 tahun",
					],
				},
				status_pekerjaan: {
					label: "Pilih kategori pekerjaan anda",
					opsi: [
						"Purna waktu",
						"Paruh waktu",
						"Wiraswasta",
						"Semi pensiun",
						"Pelajar",
						"Tidak bekerja",
					],
				},
				sumber_dana: {
					label: "Pilih kategori sumber dana anda berasal",
					opsi: [
						"Penghasilan/Gaji",
						"Tabungan",
						"Dana pensiun",
						"Keuntungan bisnis",
						"Uang saku",
						"Gabungan",
					],
				},
				penghasilan: {
					label: "Pilih kategori jumlah penghasilan anda",
					opsi: [
						"Tidak berpenghasilan",
						"1 juta - 3 juta",
						"3 juta - 5 juta",
						"6 juta - 10 juta",
						"11 juta - 20 juta",
						"Di atas 20 juta",
					],
				},
				tujuan_investasi: {
					label: "Pilih tujuan mengapa anda melakukan investasi",
					opsi: [
						"Dana pensiun",
						"Melawan inflasi",
						"Modal nikah",
						"Modal bisnis",
						"Modal rumah/properti",
					],
				},
				tingkat_resiko: {
					label: "Tingkat resiko",
					opsi: [
						"Tingkat resiko rendah",
						"Tingkat resiko moderat",
						"Tingkat resiko tinggi",
					],
				},
				jangka_waktu: {
					label: "Jangka waktu",
					opsi: [
						"Investasi jangka pendek",
						"Investasi jangka menengah",
						"Investasi jangka panjang",
					],
				},
				instrumen_investasi: {
					label: "Pilihlah instrumen investasi dengan aset tertinggi anda ",
					opsi: [
						"Reksa dana",
						"Saham",
						"Cryptocurrency",
						"P2P-Lending",
					],
				},
			},
		};
	},
	methods: {
		print(name) {
			// console.log(this.selected);
		},
		formHalving(data) {
			let listAlternatif = {};
			if (this.page == 1) {
				listAlternatif.umur = data.umur;
				listAlternatif.status_pekerjaan = data.status_pekerjaan;
				return listAlternatif;
			} else if (this.page == 2) {
				listAlternatif.sumber_dana = data.sumber_dana;
				listAlternatif.penghasilan = data.penghasilan;
				listAlternatif.tujuan_investasi = data.tujuan_investasi;
				return listAlternatif;
			} else if(this.page == 3){
				listAlternatif.tingkat_resiko = data.tingkat_resiko;
				listAlternatif.jangka_waktu = data.jangka_waktu;
				listAlternatif.instrumen_investasi = data.instrumen_investasi;
				return listAlternatif;
			}
		},
	},
	created() {
	},
};
</script>
<style scoped>
.label {
	font-weight: 600;
	font-size: 14px;
}
.form-kuesioner {
	text-align: left;
	font-size: 14px;
}
</style>
