import React from 'react';
import '@testing-library/jest-dom';
import { render, fireEvent, getByDisplayValue } from '@testing-library/react';
import Blog from './Blog';
import CreateBlog from './CreateBlog';

describe('blog test', () => {
  const blog = {
    author: 'Frank',
    title: 'Dune',
    likes: 10,
    url: 'arakis.com',
    user: { username: 'test' },
  };
  const mockHandler = jest.fn();

  const component = render(<Blog blog={blog} updateLikes={mockHandler} />);
  const button = component.getByText('view');
  fireEvent.click(button);

  test('check if url and likes exist after view click', () => {
    const likes = component.getByText(10);
    const url = component.getByText('arakis.com');
    expect(likes).toBeDefined();
    expect(url).toBeDefined();
  });

  test('render content', () => {
    const blog = {
      author: 'Frank',
      title: 'Dune',
    };
    const component = render(<Blog blog={blog} />);
    expect(component.container).toHaveTextContent('Dune');
  });

  test('if the like button is clicked twice, event handler gets called twice', () => {
    const button = component.getByText('likes');
    fireEvent.click(button);
    fireEvent.click(button);
    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
describe('form input controll', () => {
  const setBlogs = jest.fn();
  const component = render(<CreateBlog setBlogs={setBlogs} />);
  test('input has the right values', () => {
    const input = component.container.querySelector('#title');
    const form = component.container.querySelector('form');
    fireEvent.change(input, { target: { value: 'test' } });
    fireEvent.submit(form);
    expect(component.getByDisplayValue('test')).toBeInTheDocument();
  });
});
