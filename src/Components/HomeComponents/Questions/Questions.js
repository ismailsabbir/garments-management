import React from "react";
import "./Questions.css";
import { Accordion } from "react-bootstrap";
const Questions = () => {
  return (
    <div className="questions-con bg-neutral">
      <div className="question-top">
        <div className="question-top-left">
          <p>FAQ</p>
          <h1>Most Favorite Question</h1>
        </div>
        <div className="question-top-right">
          <p>
            Phasellus ultricies ex vitae neque placerat porta. Aenean libero
            eros nec ultrices vel tristique non, porta eget dolor. Donec vel
            ipsum imperdiet sed neque, sit amet porta facilisis elit. Nunc neque
            enim finibus.
          </p>
        </div>
      </div>
      <div className="questionss">
        <div className="questionss-left">
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" checked="checked" />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium">
              Click to open this one and close others
            </div>
            <div className="collapse-content">
              <p>hello</p>
            </div>
          </div>
        </div>
        <div className="questionss-right"></div>
      </div>
    </div>
  );
};

export default Questions;
