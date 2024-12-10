import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import InputWithError from '@/components/InputWithError.vue';

describe('InputWithError.vue', () => {

    it.each`type             | label           | inputId     | min            | placeholder    | task           | error        
            ${'date'}        | ${'Test Label'} | ${'test-id'}| ${'2018-01-01'}| ${'Enter text'}| ${'2018-01-02'}| ${'Some error'}
            ${'text'}        | ${'Test Label'} | ${'test-id'}| ${undefined}   | ${'Enter text'}| ${'task1'}     | ${''}        
            ${'textarea'}    | ${'Test Label'} | ${'test-id'}| ${undefined}   | ${'Enter text'}| ${'task1'}     | ${'Some error'}
            `('with type=$type it renders $type input', async (
        { type, label, inputId, min, placeholder, task, error }
    ) => {
        const props = {
            type, label, inputId, min, placeholder, task, error,
            'onUpdate:task': (e) => wrapper.setProps({ task: e }),
            'onUpdate:error': (e) => wrapper.setProps({ error: e })
        };
        const wrapper = mount(InputWithError, { props });

        const input_type = props.type;

        var input = input_type === 'textarea' ? wrapper.find('textarea') : wrapper.find('input');

        expect(input.exists()).toBe(true);

        expect(input.attributes('id')).toBe('test-id');

        if (input_type !== 'textarea') {
            expect(input.attributes('type')).toBe(input_type);
        }
        if (input_type === 'date') {
            expect(input.attributes('min')).toBe(props.min);
        }

        expect(input.attributes('placeholder')).toBe('Enter text');
        expect(input.element.value).toBe(props.task);

        const label1 = wrapper.find('label');
        expect(label1.exists()).toBe(true);
        expect(label1.text()).toBe('Test Label');
        expect(label1.attributes('for')).toBe('test-id');

        const errorMsg = wrapper.find('small');
        if (props.error) {
            expect(errorMsg.exists()).toBe(true);
            expect(input.attributes('aria-invalid')).toBe("true");
            expect(errorMsg.text()).toBe('Some error');
        } else {
            expect(errorMsg.exists()).toBe(false);
            expect(input.attributes('aria-invalid')).toBe("false");
        }
    });

    it.each([
        ["textarea"], ["text"]
    ])('(%s) test two way binds for the "task" and "error" works', async (input_type) => {

        const wrapper = mount(InputWithError, {
            props: {
                type: input_type,
                task: 'initial task',
                'onUpdate:task': (e) => wrapper.setProps({ task: e }),
                error: 'initial error',
                'onUpdate:error': (e) => wrapper.setProps({ error: e }),
            },
        });

        // before

        var input = input_type === 'textarea' ? wrapper.find('textarea') : wrapper.find('input');

        expect(input.exists()).toBe(true);
        expect(input.attributes('aria-invalid')).toBe("true");
        expect(input.element.value).toBe('initial task');

        var errorMsg = wrapper.find('small');
        expect(errorMsg.exists()).toBe(true);
        expect(errorMsg.text()).toBe('initial error');

        // make changes in parent
        await wrapper.setProps({
            task: "updated1",
            error: "updated1",
        });
        expect(wrapper.props('task')).toBe('updated1')
        expect(wrapper.vm.task).toBe('updated1');

        // assert changes in child : text and error updated
        expect(input.element.value).toBe('updated1');
        expect(input.attributes('aria-invalid')).toBe("true");

        expect(errorMsg.exists()).toBe(true);
        expect(wrapper.vm.error).toBe('updated1');

        // make changes in child
        await input.setValue("updated3")

        // assert changes in parent : text updated and error cleared
        expect(input.attributes('aria-invalid')).toBe("false");
        expect(wrapper.props('task')).toBe('updated3')
        expect(wrapper.vm.task).toBe('updated3');
        expect(wrapper.vm.error).toBe('');

    });

});
