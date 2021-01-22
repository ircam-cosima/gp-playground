export default {
  autoPlaySynth: {
    // randomizeBuffer: {
    //   type: 'boolean',
    //   default: true,
    // },
    repeatPeriod: {
      type: 'float',
      min: 0,
      max: 60,
      default: 1,
      step: 0.001,
    },
    maxReleaseOffset: {
      type: 'float',
      min: 0,
      max: 20,
      default: 1,
      step: 0.001,
    },
    releaseDuration: {
      type: 'float',
      min: 0,
      max: 20,
      default: 1,
      step: 0.001,
    },
  },

  triggerSynth: {
    repeat: {
      type: 'integer',
      min: 0,
      max: 20,
      default: 1,
      step: 1,
    },
    period: {
      type: 'float',
      min: 0,
      max: 5,
      default: 0,
      step: 0.001,
    },
    jitter: {
      type: 'float',
      min: 0,
      max: 2,
      default: 0,
      step: 0.001,
    },
    releaseDuration: {
      type: 'float',
      min: 0,
      max: 20,
      default: 1,
      step: 0.001,
    },
  },

  granularSynth: {
    volume: {
      type: 'float',
      min: 0,
      max: 1,
      step: 0.001,
      default: 1,
    },
    releaseDuration: {
      type: 'float',
      min: 0,
      max: 10,
      step: 0.1,
      default: 3,
    },
    speed: {
      type: 'float',
      min: -2,
      max: 2,
      step: 0.01,
      default: 1,
    },
    positionVar: {
      type: 'float',
      min: 0,
      max: 0.200,
      step: 0.001,
      default: 0.003,
    },
    periodAbs: {
      type: 'float',
      min: 0.001,
      max: 0.300,
      step: 0.001,
      default: 0.02,
    },
    durationAbs: {
      type: 'float',
      min: 0.010,
      max: 0.300,
      step: 0.001,
      default: 0.1,
    },
    resampling: {
      type: 'integer',
      min: -1200,
      max: 1200,
      step: 1,
      default: 0,
    },
    resamplingVar: {
      type: 'integer',
      min: 0,
      max: 1200,
      step: 1,
      default: 0,
    },
  },

  soloistSynth: {
    fadeInDuration: {
      type: 'float',
      min: 0,
      max: 40,
      step: 0.001,
      default: 0.05,
    },
    fadeOutDuration: {
      type: 'float',
      min: 0,
      max: 40,
      step: 0.001,
      default: 8,
    },
    decayExponent: {
      type: 'float',
      min: 0,
      max: 2,
      step: 0.001,
      default: 1.5,
    },
  },
}