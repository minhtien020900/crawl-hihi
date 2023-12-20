<script lang="ts" setup>
</script>
<template>
    <div class="wrapper option-1 option-1-1">
        <ol class="c-stepper">
            <li class="c-stepper__item">
                <a class="button is-rounded is-primary">
                    <span class="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path
                                d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" />
                        </svg>
                    </span>

                </a>
                <h3 class="c-stepper__title">Step 1</h3>
                <p class="c-stepper__desc">Some desc text</p>
            </li>
            <li class="c-stepper__item">
                <h3 class="c-stepper__title">Step 2</h3>
                <p class="c-stepper__desc">Some desc text</p>
            </li>
            <li class="c-stepper__item">
                <h3 class="c-stepper__title">Step 3</h3>
                <p class="c-stepper__desc">Some desc text</p>
            </li>
        </ol>
    </div>
</template>
<style lang="scss">
:root {
    --circle-size: clamp(1.5rem, 5vw, 3rem);
    --spacing: clamp(0.25rem, 2vw, 0.5rem);
}

.c-stepper {
    display: flex;
}

.c-stepper__item {
    display: flex;
    flex-direction: column;
    flex: 1;
    text-align: center;

    &:before {
        --size: 3rem;
        content: "";
        display: block;
        width: var(--circle-size);
        height: var(--circle-size);
        border-radius: 50%;
        background-color: lightgrey;
        background-color: red;
        opacity: 0.5;
        margin: 0 auto 1rem;
    }

    &:not(:last-child) {
        &:after {
            content: "";
            position: relative;
            top: calc(var(--circle-size) / 2);
            width: calc(100% - var(--circle-size) - calc(var(--spacing) * 2));
            left: calc(50% + calc(var(--circle-size) / 2 + var(--spacing)));
            height: 2px;
            background-color: #e0e0e0;
            order: -1;
        }
    }
}

.c-stepper__title {
    font-weight: bold;
    font-size: clamp(1rem, 4vw, 1.25rem);
    margin-bottom: 0.5rem;
}

.c-stepper__desc {
    color: grey;
    font-size: clamp(0.85rem, 2vw, 1rem);
    padding-left: var(--spacing);
    padding-right: var(--spacing);
}

/*** Non-demo CSS ***/

.wrapper {
    max-width: 1000px;
    margin: 2rem auto 0;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

*,
*:before,
*:after {
    box-sizing: border-box;
}
</style>