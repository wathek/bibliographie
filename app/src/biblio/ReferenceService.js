(function(){
	'use strict';

	angular.module('biblio')
		.service('referenceService', ['$q', ReferenceService]);

	function ReferenceService($q){
		var references = [
			{
				author: [],
				year: '',
				journal: '',
				title: 'L. Devillers, I. Vasilescu: “Reliability of Lexical and Prosodic cues in two real-life spoken dialog corpora”, LREC, Lisbonne, May 2004.',
				categories: [
					{
						name: 'Psychologie',
						color: 'red'
					},
					{
						name: 'Informatique',
						color: 'green'
					}
				],
				type: 'Article',
				added_at: 'description ref1'
			},
			{
				author: [],
				year: '',
				journal: '',
				title: 'A. Batliner, K. Fischer, R. Huber, J. Spilker, E. Noth, "Desperately Seeking Emotion or: Actors, Wizards and Human Beings", Proceedings of ITRW on Speech and Emotion, Newcastle, Northern Ireland, UK, 2000.',
				categories: [
					{
						name: 'Sociologie',
						color: 'blue'
					}
				],
				type: 'Thesis',
				added_at: 'description ref2'
			},
			{
				author: [],
				year: '',
				journal: '',
				title: "Picard R. W., Vyzas E., & Healey J. . “Toward Machine Emotional Intelligence: Analysis of Affective Physiological State”, IEEE Transactions on Patterns Analysis and MachineIntelligence, 23, 1175-1191, 2001.",
				categories: [
					{
						name: 'Psychologie',
						color: 'red'
					}
				],
				type: 'Article',
				added_at: 'description ref1'
			},
			{
				author: [],
				year: '',
				journal: '',
				title: 'Davidson R.J., Jackson D.C., Kalin N.H. . “Emotion, plasticity, context and regulation: Perspectives from affective neuroscience”, Psychological Bulletin 126, 890-909, 2000.',
				categories: [],
				type: 'Chapter',
				added_at: 'description ref1'
			},
			{
				author: [],
				year: '',
				journal: '',
				title: 'L. Devillers, I. Vasilescu: “Reliability of Lexical and Prosodic cues in two real-life spoken dialog corpora”, LREC, Lisbonne, May 2004.',
				categories: [],
				type: 'Book',
				added_at: 'description ref1'
			},
			{
				author: [],
				year: '',
				journal: '',
				title: 'L. Devillers, I. Vasilescu: “Reliability of Lexical and Prosodic cues in two real-life spoken dialog corpora”, LREC, Lisbonne, May 2004.',
				categories: [],
				type: 'Chapter',
				added_at: 'description ref1'
			},
			{
				author: [],
				year: '',
				journal: '',
				title: 'L. Devillers, I. Vasilescu: “Reliability of Lexical and Prosodic cues in two real-life spoken dialog corpora”, LREC, Lisbonne, May 2004.',
				categories: [],
				type: 'Thesis',
				added_at: 'description ref1'
			},
		];

		// Promise-based API
		return {
			loadAllReferences : function() {
				// Simulate async nature of real remote calls
				return $q.when(references);
			}
		};
	}
})();
