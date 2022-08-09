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
					<span v-else> Mulai pengujian </span>
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
					<tr v-for="(item, index) in content">
						<td>{{ index + 1 }}</td>
						<td>{{ `Percobaan ke ` + (index + 1) }}</td>
						<td>{{ item.mae }}</td>
						<td>{{ item.akurasi + `%` }}</td>
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
	removeAttr,
} from "../../functions/functions.js";
export default {
	data() {
		return {
			content: [],
			arrayRanking: [],
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
		rankCalculate(training, comparator) {
			for (let i in comparator) {
				this.arrayRanking[i] = [];
				for (let k in training) {
					let result =
						numerator(comparator[i], training[k]) /
						denominator(comparator[i], training[k]);

					this.arrayRanking[i].push({
						id: training[k].id,
						similarity: result,
						instrumen_investasi: training[k].instrumen_investasi,
					});
				}
			}
			// console.log(this.arrayRanking)
			return this.arrayRanking;
		},

		reAddAttr(testing, arrOfSimilarities) {
			let first = [];
			let mae = [];
			let maeSum = 0;
			let fail = 0;
			for (let index in testing) {
				first[index] = getTopN(
					arrOfSimilarities[index],
					"similarity",
					4
				);
				for (let k = 0; k < first[index].length; k++) {
					if (
						testing[index].instrumen_investasi ==
						first[index][k].instrumen_investasi
					) {
						fail++;
						break;
					}
					mae[index] = Math.abs(testing[index].instrumen_investasi - first[index][0].instrumen_investasi) ;
				}
			}
			
			mae = Array.from(mae, item => item || 0);
			for(let x = 0; x<mae.length; x++){
				maeSum += mae[x];
			}
			// console.log(mae);
			console.log(maeSum)
			let result = {
				precision:((fail / testing.length) * 100).toFixed(1),
				mae: (maeSum/mae.length).toFixed(2)
			}
			return result ;
		},

		startTesting() {
			this.content = [];
			for (let index = 0; index < this.echoTime; index++) {
				let prepare = getPercentage(this.investor, this.percentage);
				prepare.comparator = removeAttr(
					prepare.testing,
					"instrumen_investasi"
				);

				let arrOfSimilarities = this.rankCalculate(
					prepare.training,
					prepare.comparator
				);

				let content = this.reAddAttr(
					prepare.testing,
					arrOfSimilarities
				);
				this.content.push({
					akurasi: content.precision,
					mae:content.mae
				});

				// console.log(this.content);
			}
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
