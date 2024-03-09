import {msg} from '@lingui/macro'
import {useLingui} from '@lingui/react'
import {useMemo} from 'react'

export type GlobalLabelStrings = Record<
  string,
  {
    name: string
    description: string
  }
>

export function useGlobalLabelStrings(): GlobalLabelStrings {
  const {_} = useLingui()
  return useMemo(
    () => ({
      '!hide': {
        name: _(msg`Content Blocked`),
        description: _(msg`This content has been hidden by the moderators.`),
      },
      '!warn': {
        name: _(msg`Content Warning`),
        description: _(
          msg`This content has received a general warning from moderators.`,
        ),
      },
      '!no-unauthenticated': {
        name: _(msg`Sign-in Required`),
        description: _(
          msg`This user has requested that their content only be shown to signed-in users.`,
        ),
      },
      porn: {
        name: _(msg`Pornography`),
        description: _(msg`Explicit sexual images.`),
      },
      sexual: {
        name: _(msg`Sexually Suggestive`),
        description: _(msg`Does not include nudity.`),
      },
      nudity: {
        name: _(msg`Non-sexual Nudity`),
        description: _(msg`E.g. artistic nudes.`),
      },
      gore: {
        name: _(msg`Violent / Bloody`),
        description: _(msg`Gore, self-harm, torture`),
      },
    }),
    [_],
  )
}
