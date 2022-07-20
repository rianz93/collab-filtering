<template>
	<div>
		<div v-if="page < 4" class="pl-2 pr-2">
			<b-jumbotron
				header="Rekomendasi"
				lead="Pilihlah atribut yang sesuai dengan kriteria anda "
			>
				<hr />
				<p>
					Sistem rekomendasi instrumen investasi menggunakan algoritma
					collaborative-filtering
				</p>
			</b-jumbotron>
		</div>
		<div>
			<div v-if="page == 4" class="mb-2">
				<DoughnutChart :investmentRank="investmentRank" />
				<hr />
				<h4 class="first-header ml-4" style="text-align: left">
					<b-icon
						icon="card-checklist"
						class="mr-1"
						variant="success"
					></b-icon>
					Hasil Rekomendasi
				</h4>
				<div class="mt-4"></div>
				<div
					v-for="(item, index) in investmentRank"
					class="ml-4"
					style="display: flex"
				>
					<div
						v-if="index == 0 && item > 0"
						class="mb-4 instrumen-label"
					>
						Reksa Dana
					</div>
					<div
						v-if="index == 1 && item > 0"
						class="mb-4 instrumen-label"
					>
						Saham
					</div>
					<div
						v-if="index == 2 && item > 0"
						class="mb-4 instrumen-label"
					>
						Cryptocurrency
					</div>
					<div
						v-if="index == 3 && item > 0"
						class="mb-4 instrumen-label"
					>
						P2P-Lending
					</div>
					<div class="adjustment-progress" v-if="item > 0">
						<b-progress
							height="2rem"
							max="100"
							:variant="
								index == 0
									? 'success'
									: index == 1
									? 'primary'
									: index == 2
									? 'warning'
									: 'info'
							"
							show-progress
						>
							<b-progress-bar :value="item" :label="`${item}%`">
							</b-progress-bar>
						</b-progress>
					</div>
					<div>
						<b-button
							style="font-size: 14px"
							v-if="item > 0"
							variant="outline-primary"
							class="ml-2"
							><b-icon icon="info-circle" class="mr-1"></b-icon
							>Detail</b-button
						>
					</div>
				</div>
			</div>
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
					class="m-2 ml-4 form-rekomendasi"
					ref="formQ"
					@submit.prevent="rankCalculate()"
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
						variant="success"
						class="mb-2"
						type="submit"
					>
						Lihat Rekomendasi
					</b-button>
				</b-form>
			</div>
		</div>
	</div>
</template>
<script>
import DoughnutChart from "../../components/doughnutChart.vue";
import { numerator, denominator } from "../../functions/functions.js";
import { getData } from "../../database/config.js";
export default {
	components: { DoughnutChart },
	data() {
		return {
			investor: {},
			arrayRanking: [],
			investmentRank: [0, 0, 0, 0],
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
			},
		};
	},
	methods: {
		getTopN(arr, prop, n) {
			// clone before sorting, to preserve the original array
			var clone = arr.slice(0);

			// sort descending
			clone.sort((x, y) => {
				if (x[prop] == y[prop]) return 0;
				else if (x[prop] < y[prop]) return 1;
				else return -1;
			});

			return clone.slice(0, n || 1);
		},
		rankCalculate() {
			this.investor = this.$parent.investor;
			let arrayIndex = 0;
			for (let index in this.investor) {
				let result =
					numerator(this.selected, this.investor[index]) /
					denominator(this.selected, this.investor[index]);

				this.arrayRanking.push({
					id: this.investor[index].id,
					similarity: result,
					instrumen_investasi:
						this.investor[index].instrumen_investasi,
				});

				arrayIndex++;
			}
			let topThree = this.getTopN(this.arrayRanking, "similarity", 3);
			console.log("this is top tthree : "+topThree);

			switch(topThree[0].instrumen_investasi){
				case 1:
					this.investmentRank[0] += 50;
					break;
				case 2: 
					this.investmentRank[1] += 50;
					break;
				case 3:
					this.investmentRank[2] += 50;
					break;
				case 4:
					this.investmentRank[3] += 50
					break;
			}

			switch(topThree[1].instrumen_investasi){
				case 1:
					this.investmentRank[0] += 30;
					break;
				case 2: 
					this.investmentRank[1] += 30;
					break;
				case 3:
					this.investmentRank[2] += 30;
					break;
				case 4:
					this.investmentRank[3] += 30
					break;
			}

			switch(topThree[2].instrumen_investasi){
				case 1:
					this.investmentRank[0] += 20;
					break;
				case 2: 
					this.investmentRank[1] += 20;
					break;
				case 3:
					this.investmentRank[2] += 20;
					break;
				case 4:
					this.investmentRank[3] += 20
					break;
			}	
			console.log(this.investmentRank);
			this.page++;
		},
		itteration() {
			if (this.page == 1) this.progress = this.progress + 2;
			else this.progress = this.progress + 3;

			this.page++;
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
					this.selected.nama = result.value;
					this.$swal({
						title: "Silahkan mengisi data email",
						text: "mohon menggunakan alamat email yang valid",
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
				return listAlternatif;
			}
		},
	},
	created() {
		this.$parent.refreshChildIndex();
		this.checkName();
	},
	destroyed() {
		this.$parent.refreshChildIndex();
	},
};
</script>
<style>
.form-rekomendasi {
	text-align: left;
	font-size: 14px;
}
.adjustment-progress {
	width: 80%;
}
.instrumen-label {
	width: 140px;
	text-align: left;
	font-weight: 700;
}
.first-header {
	color: #28a745;
}
</style>
