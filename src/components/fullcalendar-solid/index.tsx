/* eslint-disable @typescript-eslint/no-explicit-any */
// за основу взял отсюда:
// https://github.com/fullcalendar/fullcalendar-react
import { children, Component, createEffect, onCleanup, onMount, splitProps } from 'solid-js'
import { Portal } from 'solid-js/web'
import {
  CalendarOptions,
  CalendarApi,
  Calendar,
} from '@fullcalendar/core'

interface CalendarState {
  children?: any
}

const FullCalendar: Component<CalendarOptions & CalendarState> = (props) => {
    const [state, options] = splitProps(props, ['children']);
    const c = children(() => state.children);
    let elRef: any; // HTMLDivElement | undefined
    let calendar: Calendar;

    onMount(async () => {
        calendar = new Calendar(elRef, {
          ...options,
        })
        calendar.render()
    });

    createEffect(() => {
        // const updates = computeUpdates(prevProps, options)

        // if (Object.keys(updates).length) {
            // calendar.resetOptions(updates, true)
        // }

        calendar.resetOptions(options, true)

    })

    onCleanup(() => {
        calendar.destroy();
    })

    // const getApi = () => {
    //     return calendar
    // }

    return <div ref={elRef}>
        <Portal>
            {c()}
        </Portal>
    </div>
}

// Utils
function computeUpdates(origObj: any, newObj: any): any {
  const updates: any = {}

  if (newObj !== origObj) {
    for (const key in newObj) {
      if (newObj[key] !== origObj[key]) {
        updates[key] = newObj[key]
      }
    }
  }

  return updates
}

export default FullCalendar;