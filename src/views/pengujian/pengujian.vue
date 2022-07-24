<template>
	<div>
		<div>
			<b-jumbotron
				header="Pengujian"
				lead="Hasil pengujian akurasi menggunakan MAE"
			>
				<hr />
				<p>
					Sistem rekomendasi instrumen investasi menggunakan algoritma
					collaborative-filtering
				</p>
			</b-jumbotron>
		</div>
		<div class="text-center">
			<b-form inline @submit.prevent="startTesting">
				<div class="form-divider">
					<b-icon
						icon="arrow-repeat"
						variant="success"
						class="mr-1"
					></b-icon>
					<b-form-select
						v-model="echoTime"
						:options="configPengujian.echoTime"
					>
					</b-form-select>
				</div>
				<div class="form-divider" style="margin-left: -20px">
					<b-icon
						icon="percent"
						variant="success"
						class="mr-1"
					></b-icon>
					<b-form-select
						v-model="percentage"
						:options="configPengujian.percentage"
					>
					</b-form-select>
				</div>
				<b-button
					variant="success"
					type="submit"
					:disabled="mulaiBtn"
					class="ml-2"
				>
					<span v-if="mulaiBtn"
						><b-spinner
							class="mr-2"
							small
							label="Spinning"
						></b-spinner
						>Loading.....</span
					>
					<span v-else>
						Mulai pengujian
					</span>
				</b-button>
			</b-form>
			<hr />
			<div v-if="echoTime == null || percentage == null">
				<hr />
				<h6>
					<b-icon icon="arrow-return-left" class="mr-4"></b-icon
					><i>Data masih kosong, Mulailah pengujian</i
					><b-icon icon="arrow-return-right" class="ml-4"></b-icon>
				</h6>
				<hr />
			</div>
			<table v-else class="table table-bordered m-4" style="width: 50%">
				<thead>
					<tr>
						<th style="width: 30px">No</th>
						<th style="width: 200px">Percobaan</th>
						<th style="width: 80px">Nilai MAE</th>
						<th style="width: 80px">Akurasi</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td></td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
import {
	numerator,
	denominator,
	getTopN,
	getPercentage,
} from "../../functions/functions.js";
export default {
	data() {
		return {
			mulaiBtn: true,
			investor: {},
			echoTime: null,
			percentage: null,
			configPengujian: {
				echoTime: [
					{
						text: "3X Percobaan",
						value: 3,
					},
					{
						text: "4X Percobaan",
						value: 4,
					},
					{
						text: "5X Percobaan",
						value: 5,
					},
				],
				percentage: [
					{
						text: "20% Data testing",
						value: 20,
					},
					{
						text: "30% Data testing",
						value: 30,
					},
					{
						text: "40% Data testing",
						value: 40,
					},
				],
			},
		};
	},
	methods: {
		mulaiBtnValue() {
			this.mulaiBtn = false;
		},
		startTesting() {
			let prepare = getPercentage(this.investor, this.percentage);
			console.log(prepare);
		},
	},
	created() {
		this.investor = this.$parent.investor;
		this.$parent.refreshChildIndex();
	},
	mounted() {
		setTimeout(this.mulaiBtnValue, 2500);
	},
	destroyed() {
		this.$parent.refreshChildIndex();
	},
};
</script>
<style scoped>
.form-divider {
	width: 200px;
}
</style>
