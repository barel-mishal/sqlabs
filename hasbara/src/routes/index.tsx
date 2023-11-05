import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { css } from "~/styled-system/css";
import Photo from "~/media/photo1.jpg"

export const h1Header = css({
  'color': 'blue.800', 
  'fontWeight': 'bold', 
  'fontSize': '4xl',
  'textWrap': 'balance'
});

export const card = css({
  'display': 'flex',
  'flexDirection': 'column',
  'gap': '2',
  'padding': '4',
  'border': '1px solid',
  'borderColor': 'gray.200',
  'borderRadius': 'lg',
  'boxShadow': 'lg',
  'transition': 'all 0.2s ease-in-out',
  'cursor': 'pointer',
  '&:hover': {
    'transform': 'scale(1.05)',
    'boxShadow': 'xl',
    'bg': 'blue.50',
  },
  'zIndex': '10',
  'backgroundColor': 'white',
});

export const photoDemo = css({
  height: '300px', 
  width: '100%', 
  bg: 'amber.700', 
  'display': 'grid', 
  'placeItems': 'center', 
  rounded: 'md', 
  'fontSize': '3xl', 
  color: 'amber.300'
});

export default component$(() => {
  return (
    <>
    <main class={[css({
      'display': 'grid',
      'gap': '2',
      padding: '4',
      'gridTemplateColumns': 'repeat(auto-fill,minmax(min(300px,100%),1fr));',
      })]}>
      <h1 class={[h1Header, css({'gridColumn': '1 / -1', 'marginBottom': '5', marginTop: '2'})]}> Addressing Today's Events in Israel</h1>
      
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
      <ContentCard />
    </main>
    </>
  );
});

export const ContentCard = component$(() => {
  return (
    <>
      <div class={[card]}>
        <div class={photoDemo}>Photo</div>
        <Photo />
        <p>Hamas executes an innocent African Migrant in cold blood: After publishing a video (yesterday) showing the final moments of Suheib Al Razem, we have now identified the fate of another hostage that appears in that same scene at the Nova Music Festival massacre.</p>
      </div>
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
