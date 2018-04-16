const h = require('react-hyperscript')
const { compose } = require('recompose')
const { addIndex, map, partial } = require('ramda')
const { connect: connectStyles } = require('react-fela')
const { connect: connectStore } = require('redux-bundler-react')
const { default: Stepper, Step, StepLabel } = require('material-ui/Stepper')
const Snackbar = require('material-ui/Snackbar').default
const IconButton = require('material-ui/IconButton').default
const Icon = require('material-ui/Icon').default

const styles = require('../styles/onboarding')
const steps = require('../data/steps')

module.exports = compose(
  connectStyles(styles),
  partial(connectStore, [
    'selectOnboardingStepIndex',
    'selectOnboardingStep',
    'selectOnboardingSnackbar',
    'doClearOnboardingSnackbar'
  ])
)(Onboarding)

function Onboarding (props) {
  const {
    styles,
    onboardingStepIndex: stepIndex,
    onboardingStep: step,
    onboardingSnackbar: snackbar,
    doClearOnboardingSnackbar: doClearSnackbar
  } = props

  return h('div', {
    className: styles.container
  }, [
    h(OnboardingStepper, {
      styles,
      stepIndex
    }),

    h(OnboardingSnackbar, {
      styles,
      snackbar,
      doClearSnackbar
    }),

    step != null && (
      h(step.Component, {
        step,
        stepIndex
      })
    )
  ])
}

function OnboardingStepper (props) {
  const {
    styles,
    stepIndex
  } = props

  return (
    h(Stepper, {
      activeStep: stepIndex
    }, [
      steps.map((step, index) => {
        const { label, isComplete } = step
        return (
          h(Step, {
            key: index,
            completed: isComplete
          }, [
            h(StepLabel, [
              label
            ])
          ])
        )
      })
    ])
  )
}

function OnboardingSnackbar (props) {
  const {
    styles,
    snackbar,
    doClearSnackbar
  } = props

  return (
    h(Snackbar, {
      open: snackbar.message != null,
      onClose: doClearSnackbar,
      message: snackbar.message,
      action: [
        h(IconButton, {
          key: 'close',
          'aria-label': 'Close',
          onClick: doClearSnackbar
        }, [
          h(Icon, 'close')
        ])
      ]
    })
  )
}
