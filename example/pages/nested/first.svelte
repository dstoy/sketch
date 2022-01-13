<script lang="ts">
    import { Docs, Prop, Example } from "sketch";

    export const sketch = "Nested/First";
</script>

<h2>Subtitle</h2>

<p class="test">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Convallis posuere morbi
    leo urna. Vel fringilla est ullamcorper eget nulla facilisi. Ullamcorper
    eget nulla facilisi etiam dignissim diam quis enim.
</p>

<Docs>
    <Prop name="name" type="Boolean" default={false}>
        The property description goes here.<br />
        It may be on a few lines
    </Prop>
    <Prop name="name" type="Boolean" default={false}>
        The property description goes here.<br />
        It may be on a few lines
    </Prop>
    <Prop name="name" type="Boolean">
        The property description goes here.<br />
        It may be on a few lines
    </Prop>
    <Prop name="name" type="Boolean" default={false}>
        The property description goes here.<br />
        It may be on a few lines
    </Prop>
</Docs>

<h2>Examples</h2>

<Example>Example 1</Example>
<Example>Example 2</Example>

<style lang="scss">
    .test {
        color: red !important;
    }
</style>
