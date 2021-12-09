import { useState, FC, useRef } from "react";
import { Popper, Box, Fade, Typography } from "@mui/material";
import { Link, LinkProps } from "./Link";

type InlineLinkProps = {
  popperInfo?: { title?: string; content?: string };
} & LinkProps;

export const InlineLink: FC<InlineLinkProps> = ({
  children,
  popperInfo,
  ...remainingProps
}) => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const linkRef = useRef(null);
  const popperRef = useRef<HTMLDivElement>(null);

  if (linkRef.current && !anchorEl) {
    setAnchorEl(linkRef.current);
  }

  return (
    <Box>
      {/* this should be a button */}
      <Link
        onMouseOver={() => setOpen(true)}
        onMouseLeave={(error) => {
          if (!popperRef.current) return;
          if (!popperRef.current.contains(error.currentTarget)) {
            setOpen(false);
          }
        }}
        ref={linkRef}
        sx={{
          color: "purple.600",
          fontWeight: "600",
          position: "relative",
          textDecoration: "none",
          cursor: "pointer",
          "&:after": {
            content: "''",
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "10px",
            transform: "translateY(100%)",
            pointerEvents: "none",
            transition: "all 0.3s ease",
            background: () =>
              "linear-gradient(186.24deg, #BFA9F9 -37.93%, transparent 95.07%)", // todo pick color from theme
          },
          "&:hover": {
            "&:after": {
              transform: "translateY(0)",
              height: "100%",
              background: () =>
                "linear-gradient(186.24deg, #BFA9F9 -37.93%, transparent 95.07%)",
            },
          },
        }}
        {...remainingProps}
      >
        {children}
      </Link>
      <Popper open={open} anchorEl={anchorEl} transition placement="top">
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              component="div"
              ref={popperRef}
              onMouseLeave={() => setOpen(false)}
              sx={{
                p: 2,
                mb: 2,
                boxShadow: 3,
                borderRadius: "4px",
                backgroundColor: "white",
                width: "245px",
                position: "relative",
                "&::before": {
                  content: "''",
                  position: "absolute",
                  top: "calc(100% - 6px)",
                  left: "50%",
                  width: 14,
                  height: 14,
                  backgroundColor: "white",
                  transform: "translateX(-50%) rotate(45deg)",
                },
              }}
            >
              <Typography sx={{ fontWeight: "700", mb: 1 }}>
                {popperInfo?.title}
              </Typography>
              <Typography>{popperInfo?.content}</Typography>
            </Box>
          </Fade>
        )}
      </Popper>
    </Box>
  );
};