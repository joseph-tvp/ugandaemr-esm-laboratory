import React from "react";
import {
  TestRequestItem,
  TestRequestItemStatusCancelled,
  TestRequestItemStatusInProgress,
  TestRequestItemStatusRequestApproval,
  TestRequestItemStatusSampleCollection,
} from "../../api/types/test-request-item";
import { formatTestName } from "../test-name";
import { Tag } from "@carbon/react";
import styles from "./test-name-tag.scss";

export interface ITestNameTagProps {
  testRequestItem: TestRequestItem;
  showRemarks?: boolean;
}

const getTagStyles = (testRequestItem: TestRequestItem) => {
  if (testRequestItem?.testResult?.completed) {
    return {
      background: "green",
      color: "white",
    };
  } else if (testRequestItem?.status == TestRequestItemStatusCancelled) {
    return {
      background: "red",
      color: "white",
    };
  } else if (
    testRequestItem?.status == TestRequestItemStatusRequestApproval ||
    testRequestItem?.status == TestRequestItemStatusSampleCollection ||
    testRequestItem?.status == TestRequestItemStatusInProgress
  ) {
    return {
      background: "#6F6F6F",
      color: "white",
    };
  }
  return {
    background: "gray",
    color: "white",
  };
};

const TestNameTag: React.FC<ITestNameTagProps> = ({
  testRequestItem,
  showRemarks,
}) => {
  const tagItem = (
    <Tag style={getTagStyles(testRequestItem)} role="tooltip">
      {formatTestName(
        testRequestItem?.testName,
        testRequestItem?.testShortName
      )}
    </Tag>
  );
  return (
    <>
      {showRemarks && testRequestItem?.requestApprovalRemarks ? (
        <div className={styles.tagWithRemarks}>
          {tagItem}
          <div className={styles.approvalRemarks}>
            {testRequestItem.requestApprovalRemarks}
          </div>
        </div>
      ) : (
        tagItem
      )}
    </>
  );
};

export default TestNameTag;
