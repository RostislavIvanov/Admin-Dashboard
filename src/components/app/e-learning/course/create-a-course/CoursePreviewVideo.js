import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  Button,
  Card,
  Dropdown,
  Form,
  OverlayTrigger,
  Tooltip
} from 'react-bootstrap';
import { getSize } from 'helpers/utils';
import cloudUpload from 'assets/img/icons/cloud-upload.svg';
import Flex from 'components/common/Flex';
import CardDropdown from 'components/common/CardDropdown';
const CoursePreviewVideo = ({ register }) => {
  const [video, setVideo] = useState();

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'video/*',
    onDrop: acceptedFiles => {
      setVideo(
        Object.assign(acceptedFiles[0], {
          preview: URL.createObjectURL(acceptedFiles[0])
        })
      );
    }
  });

  return (
    <Card className="mb-3">
      <Card.Header>
        <h5 className="mb-0 d-inline-block">
          Upload Preview Video
          <OverlayTrigger
            overlay={
              <Tooltip style={{ position: 'fixed' }} id="coverPphotoTooltip">
                Upload preview video
              </Tooltip>
            }
          >
            <span className="ms-2 text-primary fs-0">
              <FontAwesomeIcon icon="info-circle" />
            </span>
          </OverlayTrigger>
        </h5>
      </Card.Header>
      <Card.Body className="bg-light">
        <div {...getRootProps({ className: 'dropzone-area py-6' })}>
          <input {...getInputProps({ multiple: false })} />
          <div className="fs--1">
            <img src={cloudUpload} alt="" width={20} className="me-2" />
            <span className="d-none d-lg-inline">
              Drag your .mp4 or .mkv file here
              <br />
              or,{' '}
            </span>
            <Button variant="link" size="sm" className="p-0 fs--1">
              Browse
            </Button>
          </div>
        </div>
        {video && (
          <div className="mt-3">
            <Flex
              alignItems="center"
              className="btn-reveal-trigger"
              key={video.path}
            >
              <video width={40} height={40} className="fit-cover rounded">
                <source src={video.preview} type="video/mp4"></source>
              </video>
              <Flex
                justifyContent="between"
                direction="column"
                className="mx-2 flex-1 text-truncate"
              >
                <h6 className="text-truncate">{video.path}</h6>
                <Flex className="position-relative" alignItems="center">
                  <p className="mb-0 fs--1 text-400 line-height-1">
                    <strong>{getSize(video.size)}</strong>
                  </p>
                </Flex>
              </Flex>
              <CardDropdown>
                <div className="py-2">
                  <Dropdown.Item
                    className="text-danger"
                    onClick={() => setVideo()}
                  >
                    Remove
                  </Dropdown.Item>
                </div>
              </CardDropdown>
            </Flex>
          </div>
        )}
        <Form.Group controlId="courseYoutubeLink" className="mt-3">
          <Form.Label>or, paste youtube link here</Form.Label>
          <div className="position-relative">
            <Form.Control
              type="url"
              name="courseYoutubeLink"
              required
              placeholder="youtu.be/xXxxXxXXxxX"
              {...register('courseYoutubeLink')}
            />
            <div className="position-absolute top-50 end-0 translate-middle-y lh-1 me-2">
              <FontAwesomeIcon icon="link" className="text-400" />
            </div>
          </div>
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

CoursePreviewVideo.propTypes = {
  register: PropTypes.func.isRequired
};

export default CoursePreviewVideo;
