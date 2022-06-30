<template>
	<div>
		<div class="pl-2 pr-2">
			<b-jumbotron
				header="Kuesioner"
				lead="Data investor mengenai instrumen investasi yang dipilih"
			>
				<hr />
				<p>
					Sistem rekomendasi instrumen investasi menggunakan algoritma
					collaborative-filtering
				</p>
				<router-link to="/"
					><b-button disabled variant="outline-success"
						>Buka Aplikasi</b-button
					></router-link
				>
			</b-jumbotron>
		</div>
		<b-alert v-if="page == 4" class="mt-4 p-4" show variant="success"
			>Data kuesioner telah tersimpan, Terima kasih..</b-alert
		>
		<!-- JUMBOTRON DIVIDER -->

		<div v-else>
			<b-progress
				class="m-2"
				:value="(progress / 9) * 100"
				max="100"
				show-progress
				animated
				variant="success"
			></b-progress>
			<b-form
				class="m-2 ml-4 form-kuesioner"
				ref="formQ"
				@submit.prevent="sendDataPost()"
			>
				<div
					v-for="(item, name, index) in formHalving(alternatif)"
					class="mb-3"
				>
					<hr />
					<div class="mb-2">
						<b-badge variant="success" class="p-2 label">
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
						required
					>
					</b-form-radio-group>
				</div>
				<b-button
					block
					v-if="page < 3"
					variant="success"
					class="mb-2"
					@click="itteration()"
				>
					Berikutnya
				</b-button>
				<b-button
					block
					v-else
					variant="primary"
					class="mb-2"
					type="submit"
				>
					Simpan Data
				</b-button>
			</b-form>
		</div>
	</div>
</template>
<script>
import { sendData } from "../../database/config.js";
export default {
	data() {
		return {
			page: 1,
			progress: 0,
			selected: {
				nama: null,
				email: null,
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
						{ text: "18 tahun - 24 tahun", value: 1 },
						{ text: "25 tahun - 31 tahun", value: 2 },
						{ text: "32 tahun - 38 tahun", value: 3 },
						{ text: "39 tahun - 52 tahun", value: 4 },
						{ text: "Di atas 52 tahun", value: 5 },
					],
				},
				status_pekerjaan: {
					label: "Pilih kategori pekerjaan anda",
					opsi: [
						{ text: "Purna waktu", value: 1 },
						{ text: "Paruh waktu", value: 2 },
						{ text: "Wiraswasta", value: 3 },
						{ text: "Semi pensiun", value: 4 },
						{ text: "Pelajar", value: 5 },
						{ text: "Tidak bekerja", value: 6 },
					],
				},
				sumber_dana: {
					label: "Pilih kategori sumber dana anda berasal",
					opsi: [
						{ text: "Penghasilan/Gaji", value: 1 },
						{ text: "Tabungan", value: 2 },
						{ text: "Dana pensiun", value: 3 },
						{ text: "Keuntungan bisnis", value: 4 },
						{ text: "Uang saku", value: 5 },
						{ text: "Gabungan", value: 6 },
					],
				},
				penghasilan: {
					label: "Pilih kategori jumlah penghasilan anda",
					opsi: [
						{ text: "Tidak berpenghasilan", value: 1 },
						{ text: "1 juta - 3 juta", value: 2 },
						{ text: "3 juta - 5 juta", value: 3 },
						{ text: "6 juta - 10 juta", value: 4 },
						{ text: "11 juta - 20 juta", value: 5 },
						{ text: "Di atas 20 juta", value: 6 },
					],
				},
				tujuan_investasi: {
					label: "Pilih tujuan mengapa anda melakukan investasi",
					opsi: [
						{ text: "Dana pensiun", value: 1 },
						{ text: "Melawan inflasi", value: 2 },
						{ text: "Modal nikah", value: 3 },
						{ text: "Modal bisnis", value: 4 },
						{ text: "Modal rumah/properti", value: 5 },
					],
				},
				tingkat_resiko: {
					label: "Tingkat resiko instrumen yang dipilih",
					opsi: [
						{ text: "Tingkat resiko rendah", value: 1 },
						{ text: "Tingkat resiko moderat", value: 2 },
						{ text: "Tingkat resiko tinggi", value: 3 },
					],
				},
				jangka_waktu: {
					label: "Jangka waktu investasi",
					opsi: [
						{ text: "Investasi jangka pendek", value: 1 },
						{ text: "Investasi jangka menengah", value: 2 },
						{ text: "Investasi jangka panjang", value: 3 },
					],
				},
				instrumen_investasi: {
					label: "Pilihlah instrumen investasi dengan aset tertinggi anda ",
					opsi: [
						{ text: "Reksa dana", value: 1 },
						{ text: "Saham", value: 2 },
						{ text: "Cryptocurrency", value: 3 },
						{ text: "P2P-Lending", value: 4 },
					],
				},
			},
		};
	},
	methods: {
		print(name) {
			// console.log(this.selected);
		},
		itteration() {
			if (this.page == 1) this.progress = this.progress + 2;
			else this.progress = this.progress + 3;

			this.page++;
		},
		resetForm() {
			this.$refs.formQ.reset();
			this.page = 4;
			this.progress = 0;

			this.$swal({
				title: "Halo " + this.selected.nama + "!",
				text: " Terima kasih telah meluangkan waktu serta berpartisipasi dalam pengisian kuesioner :)",
				icon: "success",
			}).then(() => {
				this.selected = {};
				this.checkName();
			});
		},
		sendDataPost() {
			this.progress = this.progress + 3;
			sendData(this.selected);
			this.resetForm();
		},
		checkName() {
			if (this.selected.nama == null && this.page < 4) {
				this.$swal({
					title: "Silahkan mengisi data nama",
					text: "nama panggilan, nama depan atau nama sebutan",
					input: "text",
					icon: "question",
					allowOutsideClick: false,
					allowEscapeKey: false,
					confirmButtonText: "Berikutnya",
				}).then((result) => {
					this.selected.nama = result.value	;
					this.$swal({
						title: "Silahkan mengisi data email",
						text:"mohon menggunakan alamat email yang valid",
						input: "email",
						icon: "question",
						allowEscapeKey: false,
						allowOutsideClick: false,
						confirmButtonText: "Berikutnya",
					}).then((result) => {
						this.selected.email = result.value;
						this.progress++;
					});
				});
			} else {
				return 0;
			}
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
			} else if (this.page == 3) {
				listAlternatif.tingkat_resiko = data.tingkat_resiko;
				listAlternatif.jangka_waktu = data.jangka_waktu;
				listAlternatif.instrumen_investasi = data.instrumen_investasi;
				return listAlternatif;
			}
		},
	},
	mounted() {
		this.checkName();
		this.$parent.refreshChildIndex();
	},
	destroyed() {
		this.$parent.refreshChildIndex();
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
