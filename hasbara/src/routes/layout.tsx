import { Slot, component$ } from "@builder.io/qwik";
import { css } from "~/styled-system/css";

export const navBar = css({ 
  'display': 'flex',
  'gap': '2',
  'justifyContent': 'center',
  'fontSize': '2xl',
  'fontWeight': 'bold',
  'padding': '4',
});
export const backgroundBlueTextWhite = css({
  'bg': 'blue.800',
  'color': 'white',
});


export default component$(() => {
  return (
    <>
      <nav>
        <ul class={[backgroundBlueTextWhite, navBar]}>
          <li>**</li>
          <li>HASBARA</li>
          <li>**</li>
        </ul>
      </nav>
      <Slot />
    </>
  );
});
