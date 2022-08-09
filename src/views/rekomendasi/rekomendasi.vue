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
							@click="showDesc(index)"
							style="font-size: 14px"
							v-if="item > 0"
							variant="outline-success"
							class="ml-2"
							><b-icon icon="info-circle" class="mr-1"></b-icon
							>Detail</b-button
						>
					</div>
				</div>
				<hr />

				<div v-if="showDesc">
					<h4 class="first-header ml-4" style="text-align: left">
						<b-icon
							icon="card-text"
							class="mr-1"
							variant="success"
						></b-icon>
						Deskripsi
					</h4>
					<b-list-group
						v-for="(item, index) in desc"
						class="desc ml-4 mb-4 mt-4"
					>
						<b-list-group-item v-if="item.show" class="descLabel">
							<b-icon
								:icon="
									index == 'ReksaDana'
										? 'graph-up'
										: index == 'Saham'
										? 'bar-chart-line'
										: index == 'Cryptocurrency'
										? 'currency-bitcoin'
										: 'bezier2'
								"
								class="mr-2"
								:variant="
									index == 'ReksaDana'
										? 'success'
										: index == 'Saham'
										? 'primary'
										: index == 'Cryptocurrency'
										? 'warning'
										: 'info'
								"
							></b-icon>
							{{ item.label }}
						</b-list-group-item>
						<b-list-group-item v-if="item.show">
							{{ item.desc }}
							<br />
							<br />
							{{ item.desc2 }}
							<br />
							<br />
							<div v-if="index == 'ReksaDana'">
								<b> {{ `Tingkat resiko : ` }} </b>
								<span style="color: #28a745">Rendah</span>

								<br />
								<br />

								<b> {{ `Informasi : ` }} </b>
								Ada beberapa jenis reksa dana seperti : reksa
								dana pasar uang yang mengalokasi 100% modal pada
								instrumen pasar uang, reksa dana obligasi
								mengalokasi 100% modal pada obligasi, dan reksa
								dana saham yang mengalokasi sebagian besar modal
								pada saham perusahaan yang terdaftar pada bursa
								efek
								<br />
								<br />
								<b> {{ `Platform resmi  : ` }} </b>
								<span>
									<a
										target="_blank"
										href="https://www.bareksa.com/"
										>Bareksa</a
									>, <a href="www.bibit.id" target="_blank">bibit</a>,
									<a
										target="_blank"
										href="https://www.tokopedia.com/reksa-dana/dashboard"
										>tokopedia</a
									>,
									<a
										target="_blank"
										href="https://ajaib.co.id/"
										>ajaib</a
									></span
								>
							</div>
							<div v-if="index == 'Saham'">
								<b> {{ `Tingkat resiko : ` }} </b>
								<span style="color: #ffc107">Moderat</span>
								<span> - </span>
								<span style="color: #dc3545">Tinggi</span>
								<br />
								<br />

								<b> {{ `Informasi : ` }} </b>
								Dividen merupakan pembagian keuntungan yang diberikan perusahaan dan berasal dari keuntungan yang dihasilkan perusahaan, Jika seorang investor ingin mendapatkan dividen, maka investor tersebut harus memegang saham tersebut dalam kurun waktu yang relatif lama yaitu hingga kepemilikan saham tersebut berada dalam periode dimana diakui sebagai pemegang saham yang berhak mendapatkan dividen.
								<br />
								<br />
								<b> {{ `Platform resmi  : ` }} </b>
								<span>
									<a
										target="_blank"
										href="https://stockbit.com/"
										>Stockbit</a
									>,
									<a href="https://www.siminvest.id/"
										>Siminvest</a
									>,

									<a href="www.bibit.id" target="_blank"
										>bibit</a
									>
								</span>
							</div>
							<div v-if="index == 'Cryptocurrency'">
								<b> {{ `Tingkat resiko : ` }} </b>

								<span style="color: #dc3545">Tinggi</span>
								<br />
								<br />

								<b> {{ `Informasi : ` }} </b>
								Coin cryptocurrency memiliki kegunaan serta
								utilitas yang berbeda, beberapa coin menawarkan
								fitur staking dimana coin yang dimiliki akan
								dikunci untuk mendapatkan keuntungan dalam
								periode waktu tertentu
								<br>
								<br>
								<b> {{ `Platform resmi  : ` }} </b>

								<span>
									<a
										target="_blank"
										href="https://www.tokocrypto.com/"
										>Tokocrypto</a
									>,
									<a
										href="https://indodax.com/en/"
										target="_blank"
										>Indodax</a
									>,

									<a
										href="https://www.nanovest.io/"
										target="_blank"
										>Nanovest</a
									>,
									<a
										href="https://www.rekeningku.com/"
										target="_blank"
										>Rekeningku</a
									>
								</span>

								<span>
									<b-alert
										class="alertInstrument mt-3"
										show
										variant="danger"
									>
										<b-icon
											variant="danger"
											icon="exclamation-diamond"
										></b-icon>
										Perdagangan Aset Kripto merupakan
										aktivitas berisiko tinggi, pelajari dan
										berinvestasilah secara bijak</b-alert
									></span
								>
							</div>
							<div v-if="index == 'P2pLending'">
								<b> {{ `Tingkat resiko : ` }} </b>
								<span style="color: #28a745">Rendah</span>
								<span> - </span>
								<span style="color: #ffc107">Moderat</span>

								<br />
								<br />

								<b> {{ `Informasi : ` }} </b>
								Sifat dari investasi P2P-Lending yaitu tidak liquid yang berarti dana atau uang yang diinvestasikan tidak dapat dicairkan secara instan dan harus menunggu hingga periode waktu pengembalian yang telah ditentukan berakhir
								<br />
								<br />
								<b> {{ `Platform resmi  : ` }} </b>
								<span>
									<a
										target="_blank"
										href="https://www.bareksa.com/"
										>Amartha</a
									>,
									<a
										target="_blank"
										href="https://investree.id/"
										>Investree</a
									>
							</span>
							</div>
						</b-list-group-item>
					</b-list-group>
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
import { numerator, denominator, getTopN } from "../../functions/functions.js";

export default {
	components: { DoughnutChart },
	data() {
		return {
			investor: {},
			arrayRanking: [],
			investmentRank: [50, 10, 10, 30],
			addDesc: true,
			desc: {
				ReksaDana: {
					show: false,
					label: "Reksa Dana",
					desc: "Reksa dana adalah wadah yang dipergunakan untuk menghimpun dana dari masyarakat investor untuk selanjutnya diinvestasikan dalam portofolio efek oleh manajer investasi",
					desc2: "Modal yang diinvestasikan ke reksa dana akan dikelola manajer investasi lalu dialokasikan ke beberapa portofolio efek seperti :  surat berharga, yaitu surat pengakuan hutang, surat berharga komersial, saham, obligasi, tanda bukti hutang dan unit penyertaan kontrak investasi kolektif ",
				},
				Saham: {
					show: false,
					label: "Saham",
					desc: `Saham adalah bukti kepemilikan nilai sebuah perusahaan atau bukti penyertaan modal. Pemilik saham juga memiliki hak untuk mendapatkan dividen sesuai dengan jumlah saham yang dimilikinya`,
					desc2: "Saham dapat didefinisikan sebagai tanda penyertaan modal seseorang atau pihak (badan usaha) dalam suatu perusahaan atau perseroan terbatas. Dengan menyertakan modal tersebut, maka pihak tersebut memiliki klaim atas pendapatan perusahaan",
				},
				Cryptocurrency: {
					show: false,
					label: "Cryptocurrency",
					desc: "Cryptocurrency adalah mata uang digital yang dipakai untuk bertransaksi virtual dalam jaringan internet, cryptocurrency dirancang untuk bekerja sebagai media pertukaran yang menggunakan kriptografi yang kuat untuk mengamankan transaksi keuangan ",
					desc2: `Setiap transaksi yang terjadi akan dicatat pada jaringan blockchain dalam bentuk kode alamat yang unik, sistem cryptocurrency bersifat desentralisasi dimana tidak ada pihak yang hadir dan berperan sebagai perantara dalam suatu transaksi`,
				},
				P2pLending: {
					show: false,
					label: "P2P-Lending",
					desc: "P2P Lending adalah transaksi meminjamkan uang kepada individu atau bisnis. sebagai pemberi pinjaman akan menerima bunga serta mendapatkan uang Anda kembali saat pinjaman dilunas",
					desc2:`Jumlah keuntungan didapatkan dari bunga pinjaman, proses peminjaman uang memiliki periode waktu tertentu. Pendana atau pemberi pinjaman bisa melihat detail data peminjam, seperti jenis bisnis, sudah berapa lama bisnis beroperasi, tujuan pinjaman, pendapatan, riwayat keuangan dan lain-lain`,
				},
			},
			page: 4,
			progress: 0,
			selected: {
				nama: "r",
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
		showDesc(index) {
			this.addDesc = true;
			switch (index) {
				case 0:
					this.desc.ReksaDana.show = true;
					break;
				case 1:
					this.desc.Saham.show = true;
					break;
				case 2:
					this.desc.Cryptocurrency.show = true;
					break;
				case 3:
					this.desc.P2pLending.show = true;
					break;
			}
		},
		rankCalculate() {
			this.investor = this.$parent.investor;
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
			}

			let topThree = getTopN(this.arrayRanking, "similarity", 3);

			console.log(topThree);
			switch (topThree[0].instrumen_investasi) {
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
					this.investmentRank[3] += 50;
					break;
			}

			switch (topThree[1].instrumen_investasi) {
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
					this.investmentRank[3] += 30;
					break;
			}

			switch (topThree[2].instrumen_investasi) {
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
					this.investmentRank[3] += 20;
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
.desc {
	width: 80%;
	text-align: left;
}
.descLabel {
	font-weight: 700;
}
.alertInstrument {
	font-size: 13px;
	height: 40px;
}
</style>
