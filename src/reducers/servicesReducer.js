import electricianLogo from '../icons/noun_321339_cc.svg'
import plumberLogo from '../icons/noun_321315_cc.svg'
import gardenerLogo from '../icons/noun_321363_cc.svg'
import housekeeperLogo from '../icons/noun_321399_cc.svg'
import cookLogo from '../icons/noun_321395_cc.svg'

const initialState = [
  {
    service: 'Electrician',
    logo: electricianLogo,
    tasks: [
      'Install a power system',
      'Install an electrical system',
      'Install an electrical equipment',
      'Maintain an electrical equipment',
      'Replace an electrical equipment',
      'Connect the wires'
    ]
  },
  {
    service: 'Plumber',
    logo: plumberLogo,
    tasks: [
      'Unblock a toilet',
      'Unblock a sink',
      'Fix a water leak',
      'Install a sink',
      'Install a shower',
      'Install a toilet'
    ]
  },
  {
    service: 'Gardener',
    logo: gardenerLogo,
    tasks: [
      'Plant new flowers',
      'Remove falling leaves',
      'Cut the grass',
      'Pick up the trash',
      'Plant a tree',
      'Water my flowers and trees'
    ]
  },
  {
    service: 'Housekeeper',
    logo: housekeeperLogo,
    tasks: [
      'Sweep the floor',
      'Clean up the kitchen',
      'Clean a toilet',
      'Polish the windows',
      'Polish furniture and equipment',
      'Feed the dog'
    ]
  },
  {
    service: 'Cook',
    logo: cookLogo,
    tasks: [
      'Develope new recipes',
      'Cook a cake',
      'Cook some cookies',
      'Cook a pasta',
      'Feed my wife',
      'Feed my husband'
    ]
  }
]

const servicesReducer = (state = initialState, action) => {
  switch (action.type) {

    //We can add some actions here in the future

    default:
      return state
  }
}

export default servicesReducer